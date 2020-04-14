import React from 'react';
import { Tooltip, Avatar, Form, Button } from 'antd';
import { Loading3QuartersOutlined, PictureOutlined } from '@ant-design/icons'
import { useFormikContext } from 'formik';
import { FormItemProps } from 'antd/lib/form/FormItem';
import UploadImage, { UploadImageProps } from '@/smart/UploadImage';

interface Props extends Omit<UploadImageProps, 'onSuccess'>, Omit<FormItemProps, 'children'> {
  name: string;
  label?: string;
  square?: boolean;
  wrapperProps?: Omit<FormItemProps, 'children'>;
}

function ImageField({ name, label, square, wrapperProps, ...rest }: Props) {
  const { setFieldValue, values } = useFormikContext<any>();
  const value = values[name];
  const Label = (
    <span>
      {label}
      {value && (
        <Button type="link" onClick={() => setFieldValue(name, null)} className="px-0">
          {' '}
          | Remove
        </Button>
      )}
    </span>
  );
  const { folder, maxCropHeight, aspectRatio } = rest;

  return (
    <Form.Item {...wrapperProps} label={Label}>
      <UploadImage
        onSuccess={url => setFieldValue(name, url)}
        {...{ folder, maxCropHeight, aspectRatio }}
      >
        {({ loading: uploading }) => (
          <Tooltip title="Upload Image">
            <Avatar
              src={value}
              shape="square"
              size={100}
              style={square ? {} : { width: '100%', minWidth: '100px', height: '100px' }}
              className="cursor-pointer"
            >
              {uploading ? <Loading3QuartersOutlined
                spin
                style={{ fontSize: '50px', verticalAlign: 'middle' }}
              /> : <PictureOutlined style={{ fontSize: '50px', verticalAlign: 'middle' }} />}
            </Avatar>
          </Tooltip>
        )}
      </UploadImage>
    </Form.Item>
  );
}

export default ImageField;
