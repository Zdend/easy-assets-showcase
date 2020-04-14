import React, { useState } from 'react';
import { Button, Col, Row, Divider, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { css } from '@emotion/core';
import { getCurrency } from '@/utils/number';
import { getNetIncomeAndTax } from '@/utils/dataset';
import { Highlight, SubTotal } from '@/components/Typography';
import LazyNumberField from '@/components/GenericForm/LazyNumberField';
import Disclaimer from '@/components/Disclaimer';
import FeedbackButton from './FeedbackButton';

const inputStyle = css`
  margin-right: 0.5rem;
  max-width: 230px;
  input {
    font-weight: 800;
  }
`;

const NetSalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState();
  const [sacrifice, setSacrifice] = useState(0);

  const {
    grossSuperannuation,
    netIncome: netIncomeWithoutSS,
    netSuperannuation: netSuperannuationWithoutSS
  } = getNetIncomeAndTax(grossSalary);
  const { netIncome } = getNetIncomeAndTax(grossSalary ? grossSalary - sacrifice : 0);
  const taxedSacrifice = grossSalary ? sacrifice * (1 - 0.15) : 0;
  const availableSacrifice = 25000 - (grossSuperannuation || 0);

  const netTotalSuperannuation = netSuperannuationWithoutSS + taxedSacrifice;
  const netTotalPay = netIncome + netTotalSuperannuation;

  const netTotalPayWithoutSS = netIncomeWithoutSS + netSuperannuationWithoutSS;
  const netDifference = netTotalPay - netTotalPayWithoutSS;

  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <SubTotal className="text-center" large>
            Enter your income
          </SubTotal>

          <div className="flex justify-center mt-4">
            <LazyNumberField
              prefix={<DollarOutlined />}
              size="large"
              placeholder="Gross Annual Income"
              setValue={setGrossSalary}
              value={grossSalary}
              formItemCss={inputStyle}
            />
            <FeedbackButton type="primary" size="large">
              Calculate
            </FeedbackButton>
          </div>

          <Slider
            className="mt-12 w-full"
            min={0}
            max={availableSacrifice}
            step={100}
            onChange={setSacrifice as any}
            value={sacrifice}
            tooltipPlacement="top"
            tooltipVisible
            tipFormatter={() => `${getCurrency(sacrifice)} sacrificed salary`}
          />
        </Col>
      </Row>

      <SubTotal>
        <div>
          Net Income <Highlight>{getCurrency(netIncome)}</Highlight>
        </div>
        <div>
          Net Superannuation <Highlight>{getCurrency(netTotalSuperannuation)}</Highlight>
        </div>
      </SubTotal>
      <Divider />
      <SubTotal large dark>
        Total Net Pay {' '}
        <Highlight positive>{getCurrency(netTotalPay)}</Highlight>{' '}
        (Income + Superannuation)
        <div>
          Selected Salary Sacrifice saves{' '}
          <Highlight positive>{getCurrency(netDifference)}</Highlight> on taxes.
        </div>
      </SubTotal>
      <Disclaimer />
    </div>
  );
};

export default NetSalaryCalculator;
