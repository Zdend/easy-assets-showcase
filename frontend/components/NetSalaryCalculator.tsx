import React, { useState } from 'react';
import { Button, Col, Row, Divider, Checkbox } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { getCurrency } from '@/utils/number';
import { getNetIncomeAndTax } from '@/utils/dataset';
import { Highlight, SubTotal } from '@/components/Typography';
import LazyNumberField from '@/components/GenericForm/LazyNumberField';
import Disclaimer from '@/components/Disclaimer';
import FeedbackButton from './FeedbackButton';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const containerStyle = css`
  margin: 2rem 0;
  border-radius: 4px;
`;

const inputStyle = css`
  margin-right: 0.5rem;
  width: 230px;
  input {
    font-weight: 800;
  }
`;

const NetSalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState();
  const [includesSuper, setIncludesSuper] = useState(false);
  const targetGrossSalary = includesSuper ? grossSalary * 0.905 : grossSalary;
  const {
    tax,
    netIncome,
    medicareLevy,
    grossSuperannuation,
    netSuperannuation,
    superannuationTax
  } = getNetIncomeAndTax(targetGrossSalary);
  const taxPercentage = (tax / targetGrossSalary) * 100 || 0;
  const netPercentage = (netIncome / targetGrossSalary) * 100 || 0;
  const monthlyNetSalary = netIncome / 12;

  return (
    <Row justify="start" css={containerStyle}>
      <Col span={24}>
        <SubTotal className="text-center mb-6" large>
          Enter your income
        </SubTotal>
        <FormContainer>
          <LazyNumberField
            prefix={<DollarOutlined />}
            size="large"
            placeholder="Gross Annual Income"
            setValue={setGrossSalary}
            value={grossSalary}
            css={inputStyle}
          />
          <FeedbackButton type="primary" size="large">
            Calculate
          </FeedbackButton>
        </FormContainer>
        <FormContainer className="mb-10">
          <Checkbox checked={includesSuper} onChange={e => setIncludesSuper(e.target.checked)}>
            Includes Superannuation (Package)
          </Checkbox>
        </FormContainer>

        <SubTotal>
          Tax paid <Highlight negative>{getCurrency(tax)}</Highlight> ({taxPercentage.toFixed(0)}%)
        </SubTotal>
        <SubTotal>
          Medicare levy <Highlight negative>{getCurrency(medicareLevy)}</Highlight> (2%)
        </SubTotal>
        <Divider />
        <SubTotal>
          Gross Superannuation <Highlight>{getCurrency(grossSuperannuation)}</Highlight> (9.5% of
          your Gross Income)
        </SubTotal>
        <SubTotal>
          Superannuation Tax Paid <Highlight negative>{getCurrency(superannuationTax)}</Highlight>{' '}
          (15%)
        </SubTotal>
        <SubTotal>
          Net Superannuation <Highlight positive>{getCurrency(netSuperannuation)}</Highlight>
        </SubTotal>
        <Divider />
        <SubTotal large dark>
          Your take home pay is <Highlight positive>{getCurrency(netIncome)}</Highlight> (
          {netPercentage.toFixed(0)}%) annually and{' '}
          <Highlight positive>{getCurrency(monthlyNetSalary)}</Highlight> monthly.
        </SubTotal>
        <Disclaimer />
      </Col>
    </Row>
  );
};

export default NetSalaryCalculator;
