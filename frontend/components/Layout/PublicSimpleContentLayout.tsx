import React from 'react';
import { Row, Col, Typography } from 'antd';
import PublicLayout from '@/components/Layout/PublicLayout';
import { masterColumnLayout } from '@/utils/constants';
import useLocation from '@/hooks/useLocation';
import BackLink from '@/components/BackLink';
import { SEOMetaProps } from '../SEOMeta';

interface PublicSimpleContentLayout {
  children: JSX.Element | JSX.Element[];
  title?: string;
  meta?: Partial<SEOMetaProps>;
}

const PublicSimpleContentLayout = ({ children, title, meta }: PublicSimpleContentLayout) => {
  const { href } = useLocation();
  return (
    <PublicLayout
      meta={{
        title,
        canonical: href,
        ...meta
      }}
    >
      <Row justify="center" className="py-4">
        <Col {...masterColumnLayout}>
          <BackLink />
          {title && <Typography.Title level={1}>{title}</Typography.Title>}
          {children}
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default PublicSimpleContentLayout;
