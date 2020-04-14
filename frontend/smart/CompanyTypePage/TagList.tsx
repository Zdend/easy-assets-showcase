import React from 'react';
import { Col, Tag } from 'antd';
import { css } from '@emotion/core';
import { BREAKPOINT } from '@/styles/variables';
import { stripSpecial } from '@/utils/string';

const bottomColumnStyles = css`
  @media (max-width: ${BREAKPOINT.xs}) {
    width: 100%;
    margin-top: 1rem;
    text-align: left;
    flex: auto;
  }
`;

interface TagListProps {
  title: string;
  items: any[];
  render: (item: any) => string;
  getKey: (item: any) => string;
}

function TagList({ render, title, getKey, items }: TagListProps) {
  if (!items || !items.length) {
    return null;
  }

  return (
    <Col className="flex-1" css={bottomColumnStyles}>
      <div className="mb-2">
        <b>{title}:</b>
      </div>
      {items.map(item => (
        <Tag color="green" key={getKey(item)} className="m-1 capitalize">
          {stripSpecial(render(item).toLowerCase())}
        </Tag>
      ))}
    </Col>
  );
}

export default TagList;
