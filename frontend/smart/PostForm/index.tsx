import React from 'react';
import { Form, Switch, Typography, Row, Col } from 'antd';
import { FormikBag, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { notify } from '@/utils/notification';
import { handleGraphQLErrors } from '@/utils/error';
import InputField from '@/components/Form/InputField';
import RichTextField from '@/components/Form/RichTextField';
import { formItemLayout } from '@/utils/form';
import ImageField from '@/components/Form/ImageField';
import FormActions from '@/components/FormActions';
import { UploadFolder, UpdatePostInput } from '@/generated/types';
import FeatureSelect from '../FeatureSelect';
import DateField from '@/components/Form/DateField';

const initialState = {
  title: '',
  content: '',
  published: false,
  mainImage: null,
  slug: '',
  publishedAt: null,
  features: []
};
type Values = typeof initialState;

interface Props {
  post?: UpdatePostInput | null;
  loading: boolean;

  onSave: (formState: Values, actions: FormikBag<Props, Values>) => Promise<any>;
}

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3)
    .required('Required'),
  slug: Yup.string().matches(/^[a-z0-9-]*$/, 'Must be lower case characters, numbers or dashes.')
});

function PostInnerForm({ handleSubmit, values, setFieldValue }: Props & FormikProps<Values>) {
  return (
    <Form onSubmitCapture={handleSubmit} layout="vertical" initialValues={values}>
      <Row gutter={24}>
        <Col span={24} lg={12}>
          <InputField {...formItemLayout} label="Title" name="title" />
          <InputField {...formItemLayout} label="Slug" name="slug" />
        </Col>
        <Col span={24} lg={12}>
          <ImageField
            label="Banner Image"
            name="mainImage"
            wrapperProps={formItemLayout}
            folder={UploadFolder.POST}
            aspectRatio={16 / 9}
          />
        </Col>
      </Row>

      <RichTextField
        placeholder="Content"
        name="content"
        rows={20}
        uploadFolder={UploadFolder.POST}
      />

      <Row gutter={24}>
        <Col span={24} lg={12}>
          <FeatureSelect label="Features" name="features" />
        </Col>
        <Col span={24} lg={12}>
          <DateField label="Published At" name="publishedAt" />
        </Col>
      </Row>

      <FormActions>
        <Typography.Text strong className="mr-4">
          Publish
        </Typography.Text>
        <Switch
          title="Published"
          checked={values.published}
          onChange={checked => setFieldValue('published', checked)}
        />
      </FormActions>
    </Form>
  );
}

const PostForm = withFormik<Props, Values>({
  mapPropsToValues: props => ({
    ...initialState,
    ...props.post,
    slug: props?.post?.slug || initialState.slug
  }),
  validationSchema: PostSchema,
  handleSubmit: async (values, actions) => {
    try {
      await actions.props.onSave(values, actions);
    } catch (error) {
      notify('error', handleGraphQLErrors(error));
    }
  }
})(PostInnerForm);

export default PostForm;
