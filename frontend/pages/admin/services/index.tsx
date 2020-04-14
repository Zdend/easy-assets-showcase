import * as React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import Link from 'next/link';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import AdminFeatureList from '@/smart/AdminFeatureList';

const FeaturesPage = () => {
  return (
    <PrivateLayout title="Services">
      <Typography.Title level={1}>Manage Services</Typography.Title>
      <Row>
        <Col xs={24} lg={6}>
          <Link href="/admin/services/new">
            <Button type="primary" className="mb-4">
              <a>New feature</a>
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AdminFeatureList />
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default withAuth(FeaturesPage);
