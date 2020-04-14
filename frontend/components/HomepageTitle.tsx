import React from 'react';
import styled from '@emotion/styled';
import TextLoop from 'react-text-loop';
import { css } from '@emotion/core';
import { BREAKPOINT, COLORS } from '@/styles/variables';

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  padding: 4rem 0 0 0;
  white-space: nowrap;
  @media (max-width: ${BREAKPOINT.sm}) {
    font-size: 2.5rem;
    padding: 1rem 0;
  }
`;

const TitlePrefix = styled.span`
  @media (max-width: ${BREAKPOINT.md}) {
    display: block;
  }
`;

const RotatedKeyword = styled.span`
  color: ${COLORS.PRIMARY[5]};
`;

const looperStyle = css`
  display: inline-block;
`;

function HomepageTitle() {
  return (
    <Title>
      <TitlePrefix>Optimise your </TitlePrefix>
      <TextLoop interval={2000} css={looperStyle}>
        <RotatedKeyword>Assets</RotatedKeyword>
        <RotatedKeyword>Tax return</RotatedKeyword>
        <RotatedKeyword>Crypto trading</RotatedKeyword>
        <RotatedKeyword>Superannuation</RotatedKeyword>
        <RotatedKeyword>Finances</RotatedKeyword>
        <RotatedKeyword>Interest rates</RotatedKeyword>
        <RotatedKeyword>Investments</RotatedKeyword>
        <RotatedKeyword>Share trading</RotatedKeyword>
        <RotatedKeyword>Rental properties</RotatedKeyword>
      </TextLoop>
    </Title>
  );
}

export default HomepageTitle;
