import { css } from '@emotion/core';
import React, { ReactNode, useState, useEffect } from 'react';
import { Layout } from 'antd';
import AdminHeader from '../../smart/AdminHeader';
import AdminSider from '../../smart/AdminSider';
import LayoutContent from '../LayoutContent';
import SEOMeta from '../SEOMeta';

const layoutWrapperStyle = css(`
  min-height: 100vh;
`);

type Props = {
  title?: string;
  children: ReactNode;
};

const PrivateLayout: React.FC<Props> = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarCollapsed(window.innerWidth < 600);
    }
  }, []);

  return (
    <Layout css={layoutWrapperStyle} hasSider>
      <SEOMeta title={title} />
      <AdminSider collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <Layout>
        <AdminHeader collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <LayoutContent>{children}</LayoutContent>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
