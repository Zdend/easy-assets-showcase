import React from 'react';
import { Skeleton, Typography, List, Avatar } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { css } from '@emotion/core';
import { formatFixedDate } from '@/utils/date';
import usePostListingQuery from '@/hooks/usePostListingQuery';
import LazyLoad from 'react-lazyload';

const listItemMetaStyle = css`
  .ant-list-item-meta-title {
    font-size: 16px;
    font-weight: 600;
  }
`;

interface Props {
  idsExclude?: string[];
  featuresInclude?: string[];
  limit?: number;
  title?: JSX.Element;
}

function LatestsPosts({ idsExclude, featuresInclude, limit, title }: Props) {
  const { loading, data } = usePostListingQuery(
    {
      ID: idsExclude ? { notIn: idsExclude } : null,
      FEATURES: featuresInclude ? { in: featuresInclude } : null
    },
    0,
    limit,
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
      {title || <Typography.Title level={3}>Latest Articles</Typography.Title>}
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={items}
        renderItem={item => (
          <List.Item
            key={item.title}
            extra={
              <div className="flex items-center">
                <Link href="/blog/[id]" as={`/blog/${item.slug || item.id}`}>
                  <a className="px-4">Read</a>
                </Link>
                <LazyLoad height={50} placeholder={<Skeleton.Avatar active shape="square" size={50} />}>
                  <Avatar
                    shape="square"
                    size={50}
                    alt="Article Image"
                    src={item.mainImage}
                    icon={<PictureOutlined />}
                  />
                </LazyLoad>
              </div>
            }
          >
            <List.Item.Meta
              css={listItemMetaStyle}
              title={
                <Link href="/blog/[id]" as={`/blog/${item.slug || item.id}`}>
                  <a className="font-bold">{item.title}</a>
                </Link>
              }
              description={<span className="text-sm">{formatFixedDate(item.publishedAt || item.createdAt)}</span>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default LatestsPosts;
