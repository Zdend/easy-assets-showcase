import styled from '@emotion/styled';

interface ProductTitleProps {
  height?: string;
}

const ProductTitle = styled.div<ProductTitleProps>`
  font-size: 28px;
  line-height: 60px;
  ${props => (props.height ? `height: ${props.height};` : 'height: 100%;')}
  letter-spacing: 1.4px;
  display: inline-flex;
  align-items: center;

  a {
    color: white;
  }
`;

export default ProductTitle;
