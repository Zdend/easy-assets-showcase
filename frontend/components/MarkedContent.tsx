import React from 'react';
import Marked from 'marked';
import styled from '@emotion/styled';
import { grey } from '@ant-design/colors';

interface ContentProps {
  size?: 'large' | 'regular';
}

const Content = styled.div<ContentProps>`
  font-size: ${({ size }) => size === 'large' ? '18px' : '1rem'};
  * {
    max-width: 100%;
  }

  img {
    display: block;
    margin: 0 auto;
    width: auto;
  }

  iframe {
    display: block;
    margin: 0 auto;
  }

  blockquote {
    border-left: 3px solid ${grey[0]};
    padding-left: 1rem;
  }
`;

interface Props {
  size?: 'large' | 'regular';
  content: string | null | undefined;
}

function MarkedContent({ content, size }: Props) {
  if (!content) {
    return null;
  }

  const html = Marked(content);

  return <Content dangerouslySetInnerHTML={{ __html: html }} size={size} />;
}

export default MarkedContent;
