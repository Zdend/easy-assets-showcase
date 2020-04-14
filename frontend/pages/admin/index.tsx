import React, { useContext } from 'react';
import { NextPage } from 'next';
import { Typography } from 'antd';
import Link from 'next/link';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth, { AuthContext } from '@/hoc/withAuth';

const UsersPage: NextPage = () => {
  const auth = useContext(AuthContext);
  return (
    <PrivateLayout title="Admin Dashboard">
      <Typography.Title level={1}>Admin Dashboard</Typography.Title>
      <Typography.Title level={2}>Welcome back, {auth.user.name}</Typography.Title>
      <Typography.Title level={4}>Quick Menu</Typography.Title>

      <Link href="/admin/users">
        <a>Users</a>
      </Link>
      <Link href="/admin/posts">
        <a className="ml-4">Posts</a>
      </Link>
      <Link href="/admin/companies">
        <a className="ml-4">Companies</a>
      </Link>
      <Link href="/admin/services">
        <a className="ml-4">Services</a>
      </Link>
    </PrivateLayout>
  );
};

export default withAuth(UsersPage);
