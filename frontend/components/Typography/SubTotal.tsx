import styled from '@emotion/styled';
import { COLORS, BREAKPOINT } from '@/styles/variables';

interface SubTotalProps {
  large?: boolean;
  dark?: boolean;
}

const SubTotal = styled.div<SubTotalProps>`
  margin-top: 1rem;
  font-weight: 600;
  color: ${({ dark }) => (dark ? COLORS.GREY[8] : COLORS.GREY[7])};
  ${({ large }) => `font-size: ${large ? '1.5rem' : '1.25rem'};`}
  @media (max-width: ${BREAKPOINT.xs}) {
    ${({ large }) => `font-size: ${large ? '1.25rem' : '1rem'};`}
  }
`;

export default SubTotal;
