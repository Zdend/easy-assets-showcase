import React from 'react';
import { NextPage } from 'next';
import { Row, Col, Typography } from 'antd';
import PublicLayout from '@/components/Layout/PublicLayout';
import { masterColumnLayout } from '@/utils/constants';
import useLocation from '@/hooks/useLocation';
import BackLink from '@/components/BackLink';

const RegisterPage: NextPage = () => {
  const { href } = useLocation();
  return (
    <PublicLayout
      meta={{
        title: 'List your firm',
        canonical: href
      }}
    >
      <Row  justify="center" className="py-4">
        <Col {...masterColumnLayout}>
          <BackLink />
          <Typography.Title level={1}>List my firm</Typography.Title>
          If you wish your company to be listed on our website and be seen by thousands of people
          looking for the right account please send us an email with your details{' '}
          <a href="mailto:easyassets.au@gmail.com">Click Here</a>.
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default RegisterPage;
