import React from 'react';
import { Skeleton, Typography, List } from 'antd';
import Link from 'next/link';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { CompanyFilter } from '@/generated/types';
import { getCompanyLinkOptions } from '@/utils/company';
import CompanyLink from '@/components/CompanyLink';
import { CompaniesQueryResult } from '@/graphql/queries/companies.generated';
import useCompanyListingQuery, { useFetchMoreFn } from '@/hooks/useCompanyListingQuery';
import { excerpt, stripSpecial } from '@/utils/string';
import { BREAKPOINT, COLORS } from '@/styles/variables';
import ImageAvatar from '@/components/ImageAvatar';
import FetchMoreBtn from '@/components/FetchMoreBtn';
import LazyLoad from 'react-lazyload';

const listItemMetaStyle = css`
  padding-top: 1rem;
  padding-bottom: 1rem;

  .ant-list-item-meta-title {
    font-size: 18px;
    font-weight: 900;
  }

  .ant-list-item-meta-description {
    font-size: 1rem;
    color: ${COLORS.GREY[6]};
  }

  @media (max-width: ${BREAKPOINT.xs}) {
    .ant-list-item-meta-avatar {
      display: none;
    }
  }
`;

const MobileLogo = styled.div`
  margin-bottom: 1rem;
  @media (min-width: ${BREAKPOINT.sm}) {
    display: none;
  }
`;

const CTAWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
`;

export const PAGE_SIZE = 10;
interface Props {
  title?: JSX.Element;
  showEmpty?: boolean;

  filter?: CompanyFilter;
  limit?: number;
  offset?: number;

  result?: CompaniesQueryResult;
}

function CompanyListing({ title, filter, showEmpty, result, limit, offset }: Props) {
  let data: CompaniesQueryResult['data'];
  let loading: boolean;
  const pageSize = limit || PAGE_SIZE;
  let fetchMoreFn: Function;
  let fetchMore: CompaniesQueryResult['fetchMore'];

  if (!result) {
    ({ data, loading, fetchMoreFn } = useCompanyListingQuery(filter, offset, pageSize));
  } else {
    ({ data, loading, fetchMore } = result);
  }
  
  const canLoadMore = data?.companies?.items?.length < data?.companies?.total;
  
  const items = data?.companies?.items;
  if (!fetchMoreFn && fetchMore) {
    fetchMoreFn = useFetchMoreFn(fetchMore, filter, items?.length, pageSize);
  }

  if (loading && !items) {
    return <Skeleton />;
  }

  if (!showEmpty && !items?.length) {
    return null;
  }

  return (
    <div>
      {title || <Typography.Title level={2}>Companies</Typography.Title>}
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              css={listItemMetaStyle}
              avatar={
              <LazyLoad height={80} once placeholder={<Skeleton.Avatar active size={80} />}>
                <ImageAvatar src={item.logo} name={item.name} size={80} />
              </LazyLoad>
            }
              title={
                <Link {...getCompanyLinkOptions(item)}>
                  <a>{item.name}</a>
                </Link>
              }
              description={excerpt(stripSpecial(item.description), 200)}
            />
            <CTAWrapper>
              <MobileLogo>
                <LazyLoad height={50} once placeholder={<Skeleton.Avatar active size={50} />}>
                  <ImageAvatar src={item.logo} name={item.name} />
                </LazyLoad>
              </MobileLogo>
              <CompanyLink company={item} />
            </CTAWrapper>
          </List.Item>
        )}
      />

      <FetchMoreBtn loading={loading} canLoadMore={canLoadMore} fetchMore={fetchMoreFn} />
    </div>
  );
}

export default CompanyListing;
