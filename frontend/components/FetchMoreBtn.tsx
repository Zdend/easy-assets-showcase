import React from 'react';
import { Button } from 'antd';
import { css } from '@emotion/core';
import { BREAKPOINT } from '@/styles/variables';
import { DownOutlined } from '@ant-design/icons';

const loadMoreButtonStyle = css`
  min-width: 160px;
  margin: 1rem auto;

  @media (max-width: ${BREAKPOINT.xs}) {
    width: 100%;
  }
`;

interface FetchMoreBtn {
  canLoadMore: boolean;
  loading: boolean;
  fetchMore: Function;
}

const FetchMoreBtn = ({ canLoadMore, loading, fetchMore }: FetchMoreBtn) => {
  if (!canLoadMore) {
    return null;
  }
  return (
    <div className="text-center">
      <Button
        type="default"
        onClick={fetchMore as any}
        loading={loading}
        disabled={loading}
        css={loadMoreButtonStyle}
        icon={<DownOutlined />}
        shape="round"
      >
        More Results
      </Button>
    </div>
  );
}

export default FetchMoreBtn;