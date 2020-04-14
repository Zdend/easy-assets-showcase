import React from 'react';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/variables';

const Sheet = styled.div`
  min-height: 2rem;
  padding: 1rem;
  display: inline-flex;
  font-size: 0.8rem;
  min-width: 100px;
`;

const WhiteText = styled.span`
  color: white;
`;
const BlackText = styled.span`
  color: black;
`;

const ColourSection = () => (
  <>
    <h2>Colour Palette</h2>
    {Object.entries(COLORS).map(([colorName, variants]) => (
      <Row  key={colorName} className="mt-2">
        <Col>
          <h3>{colorName}</h3>
          {variants.map((color, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Sheet key={color + i} style={{ backgroundColor: color }}>
              {i > 5 && (
                <WhiteText>
                  {i} - {color}
                </WhiteText>
              )}
              {i <= 5 && (
                <BlackText>
                  {i} - {color}
                </BlackText>
              )}
            </Sheet>
          ))}
        </Col>
      </Row>
    ))}
  </>
);

export default ColourSection;
