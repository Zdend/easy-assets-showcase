import React from 'react';
import { Layout, Divider, Col, Row } from 'antd';
import { css } from '@emotion/core';
import Link from 'next/link';
import styled from '@emotion/styled';
import capitalize from 'lodash.capitalize';
import { BREAKPOINT, COLORS } from '@/styles/variables';
import { AuCity } from '@/generated/types';

const { Footer } = Layout;

const layoutFooterStyle = css(`
  padding: 0 1rem;
  text-align: center;
  background: ${COLORS.BRAND[5]};
  color: white;
`);

const layoutFooterDividerStyle = css(`
  margin-top: 0;
`);

const columnStyle = css`
  @media (max-width: ${BREAKPOINT.xs}) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;
const SectionLabel = styled.span`
  font-weight: bold;
  margin-right: 1rem;

  @media (max-width: ${BREAKPOINT.xs}) {
    display: block;
    margin-bottom: 1rem;
  }
`;

const SectionItem = styled.span`
  @media (max-width: ${BREAKPOINT.xs}) {
    display: block;
    line-height: 2rem;
  }
`;

const SectionItemDelimiter = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  @media (max-width: ${BREAKPOINT.xs}) {
    display: none;
  }
`;

const LayoutFooter = () => (
  <Footer css={layoutFooterStyle}>
    <Divider css={layoutFooterDividerStyle} />

    <Row justify="space-between" align="middle" className="pb-5 px-4">
      <Col css={columnStyle}>
        <SectionLabel>Accountants in </SectionLabel>
        {[
          AuCity.SYDNEY,
          AuCity.MELBOURNE,
          AuCity.BRISBANE,
          AuCity.ADELAIDE,
          AuCity.PERTH,
          AuCity.CANBERRA
        ].map((city, i, arr) => (
          <SectionItem key={city}>
            <Link href={`/best-accountants-tax-agents-${city.toLowerCase()}`}>
              <a>{capitalize(city)}</a>
            </Link>
            {i < arr.length - 1 && <SectionItemDelimiter> · </SectionItemDelimiter>}
          </SectionItem>
        ))}
      </Col>
      <Col css={columnStyle}>
        <SectionItem>
          <Link href="/legal/privacy-policy" prefetch={false}>
            <a>Privacy Policy</a>
          </Link>
          <SectionItemDelimiter> · </SectionItemDelimiter>
        </SectionItem>
        <SectionItem>
          <Link href="/legal/terms-of-use" prefetch={false}>
            <a>Terms of Use</a>
          </Link>
          <SectionItemDelimiter> · </SectionItemDelimiter>
        </SectionItem>
        <SectionItem>
          <Link href="/login" prefetch={false}>
            <a>Sign In</a>
          </Link>
        </SectionItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <div className="mb-6 font-bold text-sm">Copyright {new Date().getUTCFullYear()}</div>
      </Col>
    </Row>
  </Footer>
);

export default LayoutFooter;
