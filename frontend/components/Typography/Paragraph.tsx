import React from 'react';
import { Typography } from 'antd';
import { css } from '@emotion/core';

const paragraphStyle = ({ size }) => css`
  font-size: ${size === 'large' ? '18px' : ''};
`
interface ParagraphProps {
  size?: 'large' | 'regular';
  children: JSX.Element | JSX.Element[] | string;
}

const Paragraph = ({ children, size, ...rest }: ParagraphProps) => {
  return (
    <Typography.Paragraph css={paragraphStyle({ size })} {...rest}>
      {children}
    </Typography.Paragraph>
  );
};

export default Paragraph;
