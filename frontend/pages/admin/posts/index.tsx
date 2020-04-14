import * as React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import Link from 'next/link';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import AdminPostList from '@/smart/AdminPostList';

const PostsPage = () => {
  return (
    <PrivateLayout title="Blog Posts">
      <Typography.Title level={1}>Manage Blog Posts</Typography.Title>
      <Row>
        <Col xs={24} lg={6}>
          <Link href="/admin/posts/new">
            <Button type="primary" className="mb-4">
              <a>New post</a>
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AdminPostList />
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default withAuth(PostsPage);
