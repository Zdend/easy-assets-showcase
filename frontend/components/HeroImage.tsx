import React from 'react';
import styled from '@emotion/styled';
import { grey } from '@ant-design/colors';

interface HeroProps {
  src: string;
}

const HeroTitle = styled.h1<HeroProps>`
  flex: 1 0 100%;
  align-self: stretch;
  margin: 0 !important;
  align-items: center;
  display: inline-flex;
  font-weight: 900;

  ${({ src }) =>
    src
      ? `
    background-color: rgba(0, 0, 0, 0.15);
    color: white;
    justify-content: center;
    padding: 0.5rem 1rem;
  `
      : `
    justify-content: start;
  `}
`;

const HeroContainer = styled.div<HeroProps>`
  width: 100%;

  ${({ src }) =>
    src
      ? `
    min-height: 300px;
    background: url(${src}) center center;
    background-color: ${grey[0]};
    text-shadow: 2px 2px 2px #000;
  `
      : `
    padding: 2rem 0;
  `}
  -webkit-font-smoothing: antialiased;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
`;

interface Props {
  src?: string;
  title?: string | JSX.Element;
  className?: string;
}

function HeroImage({ src, title, className }: Props) {
  const Title = <HeroTitle src={src}>{title}</HeroTitle>;

  return (
    <HeroContainer className={className} src={src}>
      {title && Title}
    </HeroContainer>
  );
}

export default HeroImage;
