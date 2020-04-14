import React from 'react';
import { NextPage } from 'next';
import { Row, Col, Button } from 'antd';
import styled from '@emotion/styled';
import { grey } from '@ant-design/colors';
import PublicLayout from '@/components/Layout/PublicLayout';
import { masterColumnLayout } from '@/utils/constants';
import LatestsPosts from '@/smart/LatestPosts';
import useLocation from '@/hooks/useLocation';
import CompanySearch from '@/smart/CompanySearch';
import HomepageTitle from '@/components/HomepageTitle';
import { BREAKPOINT } from '@/styles/variables';
import Link from 'next/link';

const Subtitle = styled.h2`
  text-align: left;
  line-height: 1.5;
  font-weight: 400;
  font-size: 1.25rem;
  color: ${grey[4]};
  padding: 1rem 0 4rem 0;
  @media (max-width: ${BREAKPOINT.sm}) {
    font-size: 1rem;
    padding: 1rem 0;
  }
`;

const IndexPage: NextPage = () => {
  const { href } = useLocation();

  return (
    <PublicLayout
      meta={{
        title: `Find an accounting firm, tax agent or financial expert with Easy Assets`,
        canonical: href
      }}
    >
      <Row  justify="center" className="py-4">
        <Col {...masterColumnLayout}>
          <HomepageTitle />
          <Subtitle>
            Get your assets perform better with the right financial expert.
            <br />
            Experience an increase in profit for your own finances or business.
          </Subtitle>
          <div className="my-4" />
          <CompanySearch />
          <div className="my-4" />
          <LatestsPosts />
          <div className="text-center my-4">
            <Link href="/blog" passHref={false}>
              <Button shape="round" href="/blog">All Articles</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default IndexPage;
