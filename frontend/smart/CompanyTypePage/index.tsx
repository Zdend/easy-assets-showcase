import React, { useState } from 'react';
import { Typography, Skeleton, Row, Col, Divider, Avatar, Button } from 'antd';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PostContent from '@/components/PostContent';
import CompanyListing from '@/smart/CompanyListing';
import useLocation from '@/hooks/useLocation';
import { COLORS, BREAKPOINT } from '@/styles/variables';
import { usePublicCompanyQuery } from './CompanyQuery.generated';
import CompanyLink from '@/components/CompanyLink';
import TagList from './TagList';
import { stripSpecial, excerpt } from '@/utils/string';
import CompanyServices from './CompanyServices';
import useRedirectOnError from '@/hooks/useRedirectOnError';
import GetQuote from '../GetQuote';
import { AudienceType } from '@/generated/types';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';

const redirectButtonStyles = css`
  width: 200px;
  @media (max-width: ${BREAKPOINT.xs}) {
    width: 100%;
  }
`;

const InnerTitle = styled.div`
  color: ${COLORS.BRAND[5]};
  min-height: 100px;
  flex-grow: 1;
  flex-basis: 0;
  align-items: center;
  display: flex;
  padding-right: 1rem;
`;

const avatarStyle = css`
  width: 150px;
  height: 150px;
  margin-right: 2rem;
  @media (max-width: ${BREAKPOINT.xs}) {
    margin-right: 1rem;
    width: 100px;
    height: 100px;
  }
`;

const AudienceTypePage = () => {
  const { query, origin } = useLocation();
  const { data, error, loading } = usePublicCompanyQuery({ variables: { id: query.id as string } });
  useRedirectOnError(error);
  const { company } = data || {};
  const [getQuoteOpen, setGetQuoteOpen] = useState(false);
  const audienceType =
    company?.type === AudienceType.INDIVIDUAL_BUSINESS
      ? `individual and business`
      : company?.type?.toLowerCase();

  return (
    <PublicSimpleContentLayout
      meta={{
        title: `${company?.name || ''} - Accounting firm for ${audienceType}`,
        canonical: `${origin}/company/${company?.slug || company?.id}`,
        description: excerpt(stripSpecial(company?.description), 180, ''),
        image: company?.logo
      }}
    >
      {company && (
        <>
          <Typography.Title level={1} className="flex">
            <InnerTitle>{company.name}</InnerTitle>
            {company.logo && <Avatar src={company.logo} css={avatarStyle} />}
          </Typography.Title>
          <PostContent content={company.description} size="large" />

          <CompanyServices company={company} />

          <Row className="my-10"  justify="space-between">
            <TagList
              items={company.addresses}
              getKey={address => address.id}
              render={address => `${address.suburb} ${address.postcode}`}
              title="Locations"
            />

            <TagList
              items={company.languages}
              getKey={language => language}
              render={language => `${language}`}
              title="Languages"
            />

            <Col className="flex-1 sm:text-right mt-8 sm:mt-0">
              <Button
                type="primary"
                size="large"
                ghost
                className="mt-2"
                onClick={() => setGetQuoteOpen(true)}
              >
                Get a quote
              </Button>
              {company.affiliateUrl && (
                <CompanyLink
                  company={company}
                  buttonProps={{ size: 'large', className: 'mt-2', css: redirectButtonStyles }}
                />
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              {company.websiteUrl && (
                <div>
                  <b>Website: </b>
                  {company.websiteUrl}
                </div>
              )}
            </Col>
          </Row>

          {getQuoteOpen && (
            <div className="mt-8">
              <GetQuote handleClose={() => setGetQuoteOpen(false)} companyId={company?.id} />
            </div>
          )}

          <Divider className="mb-16" />

          <CompanyListing filter={{ ID: { notIn: [company.id] } }} />
        </>
      )}
      {loading && <Skeleton active={loading} />}
    </PublicSimpleContentLayout>
  );
};

export default AudienceTypePage;
