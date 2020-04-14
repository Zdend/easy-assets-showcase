import React from 'react';
import { Row, Col } from 'antd';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const CenterBox: React.FC<Props> = ({ children }) => (
  <Row  justify="center" align="middle" className="py-8">
    <Col xs={24} sm={12} lg={10} xl={6}>
      {children}
    </Col>
  </Row>
);

export default CenterBox;
