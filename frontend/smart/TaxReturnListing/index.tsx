import React from 'react';
import { Skeleton, Row, Col } from 'antd';
import Link from 'next/link';
import { CompanyFilter, CompanyField, CompanyTag } from '@/generated/types';
import { getCompanyLinkOptions } from '@/utils/company';
import CompanyLink from '@/components/CompanyLink';
import useCompanyListingQuery from '@/hooks/useCompanyListingQuery';
import { excerpt, stripSpecial } from '@/utils/string';
import ImageAvatar from '@/components/ImageAvatar';
import FetchMoreBtn from '@/components/FetchMoreBtn';
import { css } from '@emotion/core';
import { COLORS, BREAKPOINT } from '@/styles/variables';
import styled from '@emotion/styled';

const rowStyleCommon = `
  padding: 1rem 0;

  @media (min-width: ${BREAKPOINT.md}) {
    display: flex;
    align-items: center;
  }
`
const rowStyle = css`
  border-bottom: 1px solid ${COLORS.GREY[1]};
  ${rowStyleCommon}
`;

const rowStyleLast = css`${rowStyleCommon}`;

const companyNameStyle = css`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${COLORS.GREY[7]};
`;

const pricingLabelStyle = css`
  font-weight: 800;
  line-height: 2.2;
`;
const pricingStyle = css`
  white-space: pre-wrap;
`;

const ActionWraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  @media (max-width: ${BREAKPOINT.md}) {
    flex-wrap: nowrap;
    flex-direction: row;
    margin-top: .5rem;
  }
`

export const PAGE_SIZE = 10;
interface Props {

}


const filter: CompanyFilter = {
  [CompanyField.COMPANY_TAG]: {
    in: [CompanyTag.TAX_RETURN]
  }
}

function TaxReturnListing({ }) {  
  const { data, loading, fetchMoreFn } = useCompanyListingQuery(filter, 0, PAGE_SIZE, CompanyField.PRICING);

  const canLoadMore = data?.companies?.items?.length < data?.companies?.total;
  
  const items = data?.companies?.items;

  if (loading && (!items || !items.length)) {
    return <Skeleton />;
  }
  
  return (
    <div>
      {items.map((item, i) => (
        <Row key={item.id} css={i >= items.length - 1 ? rowStyleLast : rowStyle}>
          <Col xs={24} md={14} className="self-start">
            <div className="flex flex-wrap items-start pr-4">
              <div className="flex-grow w-full">
                <Link {...getCompanyLinkOptions(item)}>
                  <a css={companyNameStyle}>{item.name}</a>
                </Link>
              </div>
              <div className="flex-grow w-full">
                {excerpt(stripSpecial(item.description), 200)}
              </div>
            </div>
          </Col>
          <Col xs={24} md={6} className="self-start">
            {item.pricing && <div className="mt-2 md:mt-0">
              <div css={pricingLabelStyle}>Pricing</div>
              <div css={pricingStyle}>{item.pricing}</div>
            </div>}
          </Col>
          <Col xs={24} md={4}>
            <ActionWraper>
              <div className="mb-2 hidden md:block">
                <ImageAvatar src={item.logo} name={item.name} size={40} />
              </div>
              <CompanyLink company={item} classes="ma-0" buttonProps={{ size: 'middle', className: item.premium ? '' : 'text-left md:text-center px-0' }} />
            </ActionWraper>
          </Col>
      </Row>))}

      <FetchMoreBtn loading={loading} canLoadMore={canLoadMore} fetchMore={fetchMoreFn} />
    </div>
  );
}

export default TaxReturnListing;
