import React from 'react';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/variables';

const Disclaimer = styled.div`
  font-size: 0.7rem;
  color: ${COLORS.GREY[5]};
  margin-top: 1rem;
`;

export default () => (
  <Disclaimer className="text-right">Numbers above are for indicative purposes only.</Disclaimer>
);
