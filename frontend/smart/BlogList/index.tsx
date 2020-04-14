import React from 'react';
import { Skeleton, Typography, List } from 'antd';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { formatFixedDate } from '@/utils/date';
import usePostListingQuery from '@/hooks/usePostListingQuery';
import { excerpt, stripSpecial } from '@/utils/string';
import { BREAKPOINT } from '@/styles/variables';
import MarkedContent from '@/components/MarkedContent';
import { getPostLinkOptions } from '@/utils/post';

const BlogRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;
interface BlogPreviewImageProps {
  src: string;
}

const BlogPreviewImage = styled.div<BlogPreviewImageProps>`
  display: block;
  height: 150px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  ${({ src }) => (src ? `background-image: url(${src});` : '')}
  border-radius: 4px;
`;

const listItemStyle = css`
  .ant-list-item-meta-title {
    font-size: 20px;
  }

  @media (max-width: ${BREAKPOINT.xs}) {
    & > .ant-list-item-extra {
      width: 100%;
    }
  }
`;

interface Props {
  idsExclude?: string[];
  featuresInclude?: string[];
  limit?: number;
}

function BlogList({ idsExclude, featuresInclude, limit }: Props) {
  const { loading, data } = usePostListingQuery(
    {
      ID: idsExclude ? { notIn: idsExclude } : null,
      FEATURES: featuresInclude ? { in: featuresInclude } : null
    },
    0,
    limit
  );

  const items = data?.posts?.items;

  if (loading) {
    return <Skeleton />;
  }

  if (!items || !items.length) {
    return null;
  }

  return (
    <div>
      <Typography.Title level={3}>Blog Articles</Typography.Title>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={items}
        renderItem={item => (
          <List.Item
            css={listItemStyle}
            key={item.title}
            extra={
              <BlogRightColumn className="flex">
                {item.mainImage && <BlogPreviewImage src={item.mainImage} />}
              </BlogRightColumn>
            }
          >
            <List.Item.Meta
              title={
                <Link {...getPostLinkOptions(item)}>
                  <a>{item.title}</a>
                </Link>
              }
              description={formatFixedDate(item.createdAt)}
            />
            <MarkedContent content={excerpt(stripSpecial(item.content), 250)} />
            <Link {...getPostLinkOptions(item)}>
              <a className="pl-2">Read</a>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}

export default BlogList;
