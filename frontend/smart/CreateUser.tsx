import React from 'react';
import { Button, Form } from 'antd';
import { Formik, FormikBag } from 'formik';
import * as Yup from 'yup';
import { notify } from '@/utils/notification';
import { handleGraphQLErrors } from '@/utils/error';
import InputField from '../components/Form/InputField';
import { UsersDocument } from '@/graphql/queries/users.generated';
import { useCreateUserMutation } from '@/graphql/mutations/createUser.generated';

const initialState = { firstName: '', lastName: '', email: '' };
type Values = typeof initialState;

const CreateUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('First Name')
    .min(2)
    .required('Required'),
  lastName: Yup.string()
    .label('Last Name')
    .min(2)
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const handleSubmit = createUser => async (values: Values, actions: FormikBag<Values, {}>) => {
  try {
    await createUser({
      variables: { input: values },
      refetchQueries: [{ query: UsersDocument }]
    });
    actions.resetForm();
    notify('success', `User ${values.email} has been created!`);
  } catch (error) {
    notify('error', handleGraphQLErrors(error));
  }
};

function CreateUser() {
  const [createUser, { loading }] = useCreateUserMutation();
  return (
    <Formik
      initialValues={initialState}
      validationSchema={CreateUserSchema}
      onSubmit={handleSubmit(createUser)}
    >
      {props => (
        <Form onSubmitCapture={props.handleSubmit}>
          <InputField placeholder="First Name" name="firstName" />
          <InputField placeholder="Last Name" name="lastName" />
          <InputField placeholder="Email" name="email" />

          <Form.Item>
            <Button htmlType="submit" loading={loading} type="primary">
              Signup User
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
}

export default CreateUser;
