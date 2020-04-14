import styled from '@emotion/styled';
import { COLORS } from '@/styles/variables';

interface HighlightProps {
  positive?: boolean;
  negative?: boolean;
}

const Highlight = styled.span<HighlightProps>`
  font-weight: 800;
  ${({ positive, negative }) => {
    let color = positive ? COLORS.SUCCESS[5] : COLORS.INFO[5];
    color = negative ? COLORS.ERROR[5] : color;
    return `color: ${color};`;
  }}
`;

export default Highlight;
