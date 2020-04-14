import { S3 } from 'aws-sdk';

const isLocal = process.env.NODE_ENV !== 'production';
export const BUCKET_NAME = process.env.AMAZON_BUCKET_NAME;

export const createS3client = () => {
  return new S3({
    credentials: {
      accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
      secretAccessKey: process.env.AMAZON_SECRET_KEY
    },
    /**
     * When working locally, we'll use the Localstack endpoints. This is the one for S3.
     * A full list of endpoints for each service can be found in the Localstack docs.
     */
    endpoint: isLocal ? process.env.AMAZON_S3_ENDPOINT : undefined,
    /**
     * Including this option gets localstack to more closely match the defaults for
     * live S3. If you omit this, you will need to add the bucketName to the `Key`
     * property in the upload function below.
     *
     * see: https://github.com/localstack/localstack/issues/1180
     */
    s3ForcePathStyle: true,
    sslEnabled: !isLocal,
    region: process.env.AMAZON_REGION
  });
};

type UploadFileOptions = Omit<S3.PutObjectRequest, 'Bucket' | 'Key' | 'Body'>;
export const uploadFile = async (
  data: S3.Body,
  fileName: string,
  options?: UploadFileOptions
): Promise<S3.ManagedUpload.SendData> => {
  const s3client = createS3client();

  const response = await s3client
    .upload({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: data,
      CacheControl: 'max-age=31556926', // Cache for one year
      ...options
    })
    .promise();

  if (isLocal && response) {
    response.Location = response.Location.replace(
      'http://host.docker.internal:4572',
      'http://localhost:4572'
    );
  }

  return response;
};

export const findAllFiles = async (
  options?: Omit<S3.Types.ListObjectsRequest, 'Bucket'>
): Promise<S3.Types.ListObjectsOutput> => {
  const s3client = createS3client();
  return s3client.listObjects({ Bucket: BUCKET_NAME, ...options }).promise();
};

export const deleteFile = async (options: Omit<S3.Types.DeleteObjectRequest, 'Bucket'>) => {
  const s3client = createS3client();
  return s3client.deleteObject({ Bucket: BUCKET_NAME, ...options }).promise();
};

export const getKeyFromUrl = (url: string): string =>
  url.substring(url.indexOf(BUCKET_NAME) + BUCKET_NAME.length + 1, url.length);

const MARKDOWN_IMAGE_REGEXP = /(?:!\[[^\]]*\])\(([^)]*)\)*/g;
export const getMatchesFromText = (text: string, pattern = MARKDOWN_IMAGE_REGEXP): string[] => {
  const images = [];
  let match;

  // eslint-disable-next-line no-cond-assign
  while ((match = pattern.exec(text))) {
    const url = match && match.length ? match[1] : null;
    if (url) {
      images.push(getKeyFromUrl(url));
    }
  }
  return images;
};
