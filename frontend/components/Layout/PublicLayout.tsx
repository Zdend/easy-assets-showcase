import { css } from '@emotion/core';
import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import LayoutFooter from '../LayoutFooter';
import LayoutContent from '../LayoutContent';
import SEOMeta, { SEOMetaProps } from '../SEOMeta';
import PublicHeader from '../PublicHeader';

const layoutWrapperStyle = css(`
  min-height: 100vh;
  background: transparent;
`);

type Props = {
  children: ReactNode;
  meta?: SEOMetaProps;
};

const PublicLayout: React.FC<Props> = ({ children, meta }) => {
  return (
    <Layout css={layoutWrapperStyle}>
      <SEOMeta {...meta} />
      <PublicHeader />
      <LayoutContent>{children}</LayoutContent>
      <LayoutFooter />
    </Layout>
  );
};

export default PublicLayout;
