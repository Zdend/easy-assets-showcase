import * as React from 'react';
import { Typography } from 'antd';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import AdminLeadList from '@/smart/AdminLeadList';

const LeadsPage = () => {
  return (
    <PrivateLayout title="Leads">
      <Typography.Title level={1}>Manage Leads</Typography.Title>

      <AdminLeadList />

    </PrivateLayout>
  );
};

export default withAuth(LeadsPage);
