import * as React from 'react';
import { NextPage } from 'next';
import { Typography } from 'antd';
import PublicLayout from '@/components/Layout/PublicLayout';
import ForgotPasswordForm from '@/smart/ForgotPassword';
import CenterBox from '@/components/CenterBox';
import BackLink from '@/components/BackLink';

const ForgotPasswordPage: NextPage = () => {
  return (
    <PublicLayout meta={{ title: 'Forgot Password?' }}>
      <CenterBox>
        <BackLink />
        <Typography.Title>Forgot Password?</Typography.Title>
        <ForgotPasswordForm />
      </CenterBox>
    </PublicLayout>
  );
};

export default ForgotPasswordPage;
