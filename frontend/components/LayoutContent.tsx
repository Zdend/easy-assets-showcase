import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { css } from '@emotion/core';
import usePageTransition from '../hooks/usePageTransition';
import LoadingOverlay from './LoadingOverlay';

const { Content } = Layout;

const layoutContentStyle = css(`
  padding: 1rem;
  position: relative;
  min-height: 300px;
`);

const LayoutContent = ({ children }) => {
  const loading = usePageTransition();
  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <Content css={layoutContentStyle}>
      <LoadingOverlay loading={loading} />
      {children}
    </Content>
  );
};

export default LayoutContent;
