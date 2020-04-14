import React from 'react';
import { Spin, Layout, Typography } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { css } from '@emotion/core';

const loadingOverlayStyle = css({
  position: 'absolute',
  alignItems: 'center',
  paddingTop: '30vh',
  justifyContent: 'top',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'white',
  zIndex: 1100
});

const spinnerTextStyle = css(`
  margin-top: 1rem;
  margin-left: 1rem;
`);

const antIcon = <Loading3QuartersOutlined style={{ fontSize: 50 }} spin />;

function LoadingOverlay({ loading }) {
  if (!loading) {
    return null;
  }

  return (
    <Layout css={loadingOverlayStyle}>
      <Spin indicator={antIcon} />
      <Typography.Title type="secondary" level={2} css={spinnerTextStyle}>
        Loading...
      </Typography.Title>
    </Layout>
  );
}

export default LoadingOverlay;
