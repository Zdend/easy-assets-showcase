import React from 'react';
import { Button, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Formik, FormikBag } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Form/InputField';
import { notify } from '@/utils/notification';
import { handleGraphQLErrors } from '@/utils/error';
import { useForgotPasswordMutation } from '@/graphql/mutations/forgotPassword.generated';

const initialState = { email: '' };
type Values = typeof initialState;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const handleSubmit = (forgotPassword: Function) => async (
  values: Values,
  actions: FormikBag<Values, {}>
) => {
  try {
    await forgotPassword({
      variables: { email: values.email }
    });
    actions.resetForm();
    notify('success', 'We have sent you instructions to reset your password!');
  } catch (error) {
    notify('error', handleGraphQLErrors(error));
  }
};

function ForgotPasswordForm() {
  const [forgotPassword, { loading }] = useForgotPasswordMutation();

  return (
    <Formik
      initialValues={initialState}
      validationSchema={ForgotPasswordSchema}
      onSubmit={handleSubmit(forgotPassword)}
    >
      {props => (
        <Form onSubmitCapture={props.handleSubmit} layout="vertical">
          <InputField
            name="email"
            type="text"
            placeholder="Email"
            label="Email"
            prefix={<UserOutlined />}
            size="large"
          />
          <Form.Item>
            <Button htmlType="submit" loading={loading} block type="primary" size="large">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordForm;
