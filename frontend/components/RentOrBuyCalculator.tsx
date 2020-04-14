import React, { useState } from 'react';
import { IBarChartOptions } from 'chartist';
import { Slider, Form, Row, Col, Button, Divider } from 'antd';
import { css } from '@emotion/core';
import { BASE_UNIT, COLORS } from '@/styles/variables';
import ChartistGraph from '@/components/ChartistGraph';
import {
  includeEveryN,
  getNetIncomeAndTax,
  getCompundInterestData,
  getHomeOwnershipWealth
} from '@/utils/dataset';
import { getCurrency } from '@/utils/number';
import LazyNumberField, { LazyNumberFieldProps } from '@/components/GenericForm/LazyNumberField';
import Disclaimer from '@/components/Disclaimer';
import { SubTotal, Highlight } from './Typography';
import FeedbackButton from './FeedbackButton';

const CHART_HEIGHT = 400;

const chartStyle = css`
  height: ${CHART_HEIGHT}px;

  .ct-grids line {
    stroke: ${COLORS.PRIMARY[2]};
  }

  .ct-series-a .ct-bar {
    opacity: 0.9;
    stroke: ${COLORS.WARNING[5]};
  }

  .ct-series-b .ct-bar {
    opacity: 0.9;
    stroke: ${COLORS.PURPLE[5]};
  }
`;

const defaultOptions: Partial<IBarChartOptions> = {
  height: CHART_HEIGHT,
  axisX: {
    offset: BASE_UNIT * 2,
    labelInterpolationFnc: includeEveryN(5)
  },
  axisY: {
    offset: BASE_UNIT * 7,
    labelInterpolationFnc: includeEveryN(3, value => `${getCurrency(value / 1000)}k`)
  }
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  }
};

const NumberField: React.FC<LazyNumberFieldProps> = props => (
  <LazyNumberField {...formItemLayout} {...props} />
);

const RentOrBuyCalculator = () => {
  const [years, setYears] = useState(15);
  const [salary, setSalary] = useState(80000);
  const [monthlyLivingExpenses, setMonthlyLivingExpenses] = useState(700);
  const [savings, setSavings] = useState(100000);
  const [investmentRate, setInvestmentRate] = useState(10);

  const [monthlyRent, setMonthlyRent] = useState(2000);

  const [propertyPrice, setPropertyPrice] = useState(600000);
  const [legalFees, setLegalFees] = useState(30000);
  const [mortageRate, setMortageRate] = useState(3.5);
  const [propertyCapitalGain, setPropertyCapitalGain] = useState(5);
  // Strata, upkeep, council, repairs, insurance - monthly
  const [monthlyOwnershipCost, setMonthlyOwnershipCost] = useState(500);

  const { netIncome } = getNetIncomeAndTax(salary);
  const annualLivingExpenses = monthlyLivingExpenses * 12;
  const annualRent = monthlyRent * 12;
  const annualRentContribution = netIncome - annualLivingExpenses - annualRent;
  const {
    values: rentingValues,
    years: yearLabels,
    totalValue: rentingNetWorth
  } = getCompundInterestData(years, savings, investmentRate / 100, annualRentContribution, 0);

  const annualOwnershipCost = monthlyOwnershipCost * 12;
  const annualOwningExpenses = annualLivingExpenses + annualOwnershipCost;
  const annualRepayments = netIncome - annualOwnershipCost - annualOwningExpenses;
  const {
    values: owningValues,
    totalValue: owningNetWorth,
    mortgageOwed,
    propertyValue,
    investmentValue
  } = getHomeOwnershipWealth(
    years,
    savings,
    propertyPrice + legalFees,
    mortageRate / 100,
    propertyCapitalGain / 100,
    investmentRate / 100,
    annualRepayments
  );

  const data = {
    labels: yearLabels,
    series: [rentingValues, owningValues]
  };
  const options = defaultOptions;

  return (
    <Form layout="horizontal" className="my-8">
      <Row>
        <Col>
          <h3>Finances excluding Accommodation</h3>
          <Divider />
          <NumberField value={savings} setValue={setSavings} label="Current Savings" />
          <NumberField
            value={salary}
            setValue={setSalary}
            label="Annual Income"
            extra="Gross Annual Salary"
          />
          <NumberField
            value={monthlyLivingExpenses}
            setValue={setMonthlyLivingExpenses}
            label="Monthly Living Expenses"
            extra="Food, utility, entertainment, loans"
          />
          <NumberField
            value={investmentRate}
            setValue={setInvestmentRate}
            label="Interest Rate"
            extra="Interest rate for your savings. When renting all available money is invested, when buying all available money goes to mortgage repayment and then it is invested."
            suffix="%"
          />
          <h3>If I Rent</h3>
          <Divider />
          <NumberField value={monthlyRent} setValue={setMonthlyRent} label="Monthly Rent" />
          <h3>If I Buy</h3>
          <Divider />
          <NumberField value={propertyPrice} setValue={setPropertyPrice} label="Property Price" />
          <NumberField value={legalFees} setValue={setLegalFees} label="Stamp Duty, Legal Fees" />
          <NumberField
            value={mortageRate}
            setValue={setMortageRate}
            label="Mortage Rate"
            suffix="%"
          />
          <NumberField
            value={propertyCapitalGain}
            setValue={setPropertyCapitalGain}
            label="Annual Property Price Gain"
            suffix="%"
            extra="Cities like Sydney tend to have higher property annual growth."
          />
          <NumberField
            value={monthlyOwnershipCost}
            setValue={setMonthlyOwnershipCost}
            label="Monthly Ownership Cost"
            extra="Strata fees, council fees, maintenance, insurance"
          />

          <Row  justify="center" className="mb-6">
            <Col>
              <FeedbackButton type="primary" size="large" className="px-10">
                Calculate
              </FeedbackButton>
            </Col>
          </Row>

          <Form.Item className="font-bold float-right text-right">
            <div className="warning--text inline-block">Renting and Investing</div>
            <div className="purple--text inline-block ml-4">
              Buying and Investing once mortage paid
            </div>
          </Form.Item>
        </Col>
      </Row>

      <div className="my-2" css={chartStyle}>
        <ChartistGraph data={data} options={options} type="Bar" />
      </div>

      <div className="mt-12">
        <Slider
          min={1}
          max={40}
          onChange={setYears as any}
          value={years}
          tooltipPlacement="top"
          tooltipVisible
          tipFormatter={() => `${years} years`}
        />
      </div>

      <h3 className="warning--text text-2xl">If you rent:</h3>
      <SubTotal>
        In {years} years your investment portfolio will be worth{' '}
        <Highlight positive>{getCurrency(rentingNetWorth)}</Highlight>, given{' '}
        {investmentRate}% interest rate. You will be able to save{' '}
        <Highlight>{getCurrency(annualRentContribution)}</Highlight> every year.
      </SubTotal>
      <Divider />
      <h3 className="purple--text text-2xl">If you buy:</h3>
      <SubTotal>
        In {years} years your net worth of your property and investments will be{' '}
        <Highlight positive>{getCurrency(owningNetWorth)}</Highlight>.{' '}
        {mortgageOwed > 0 && (
          <>
            You will still owe <Highlight negative>{getCurrency(mortgageOwed)}</Highlight>{' '}
            while having no money in other investments.{' '}
          </>
        )}
        The final value of your property will be{' '}
        <Highlight>{getCurrency(propertyValue)}</Highlight>. You will be able to repay
        and then save <Highlight>{getCurrency(annualRepayments)}</Highlight> every
        year.{' '}
        {investmentValue > 0 && (
          <>
            After paying of your mortgage you will manage to invest{' '}
            <Highlight>{getCurrency(investmentValue)}</Highlight>, given{' '}
            {investmentRate}% interest rate.
          </>
        )}{' '}
      </SubTotal>
      <Disclaimer />
    </Form>
  );
};

export default RentOrBuyCalculator;
