import * as React from 'react';
import { NextPage } from 'next';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { useApolloClient } from 'react-apollo';
import PublicLayout from '@/components/Layout/PublicLayout';
import LoginForm from '@/smart/LoginForm';
import CenterBox from '@/components/CenterBox';
import { notify } from '@/utils/notification';
import { fetchViewer } from '@/utils/auth';
import BackLink from '@/components/BackLink';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();

  React.useEffect(() => {
    const { query } = router;
    if (query && query.hasOwnProperty('invalid-reset-password-token')) {
      notify('error', 'Invalid reset password token');
    }
    async function checkLoggedIn() {
      const { loggedIn } = await fetchViewer(apolloClient);
      if (loggedIn) {
        await router.push('/admin');
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <PublicLayout meta={{ title: 'Login' }}>
      <CenterBox>
        <BackLink />
        <Typography.Title>Login</Typography.Title>
        <LoginForm />
      </CenterBox>
    </PublicLayout>
  );
};

export default LoginPage;
