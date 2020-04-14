import * as React from 'react';
import { Row, Col, Typography } from 'antd';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import CreateUser from '@/smart/CreateUser';
import AdminUserList from '@/smart/AdminUserList';
import withAuth from '@/hoc/withAuth';

const UsersPage = () => {
  return (
    <PrivateLayout title="User management">
      <Typography.Title level={1}>Manage Users</Typography.Title>
      <Row>
        <Col xs={24} lg={8}>
          <Typography.Title level={2}>Create User</Typography.Title>
          <CreateUser />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Typography.Title level={2}>Users</Typography.Title>
          <AdminUserList />
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default withAuth(UsersPage);
