import * as React from 'react';
import { NextPage } from 'next';
import { Typography } from 'antd';
import PublicLayout from '@/components/Layout/PublicLayout';
import ResetPasswordForm from '@/smart/ResetPasswordForm';
import CenterBox from '@/components/CenterBox';
import { redirect } from '@/utils/routing';
import BackLink from '@/components/BackLink';

const ResetPasswordPage: NextPage = props => {
  return (
    <PublicLayout meta={{ title: 'Reset Password' }}>
      <CenterBox>
        <BackLink />
        <Typography.Title>Reset Password</Typography.Title>
        <ResetPasswordForm {...props} />
      </CenterBox>
    </PublicLayout>
  );
};

ResetPasswordPage.getInitialProps = async context => {
  const { email, token } = context.query;
  if (!email || !token) {
    redirect(context, '/login?invalid-reset-password-token');
  }
  return { email, token };
};

export default ResetPasswordPage;
