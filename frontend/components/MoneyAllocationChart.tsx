import React, { useState } from 'react';
import { IPieChartOptions } from 'chartist';
import { Form, Row, Col } from 'antd';
import { css } from '@emotion/core';
import capitalize from 'lodash.capitalize';
import styled from '@emotion/styled';
import { BREAKPOINT, COLORS } from '@/styles/variables';
import { BaseChartistGraph, ChartitGraphPieProps } from '@/components/ChartistGraph';
import { formatNumber, getCurrency } from '@/utils/number';
import { draw } from '@/styles/animations';
import LazyNumberField from '@/components/GenericForm/LazyNumberField';
import { registerFillAnimation } from '@/utils/chart/pie-fill-animation';
import withRerenderCheck from '@/hoc/withRerenderCheck';
import Disclaimer from '@/components/Disclaimer';
import { Highlight } from './Typography';

const CHART_HEIGHT = 400;

const Sentence = styled.div`
  font-weight: 600;
  margin-top: 2rem;
  display: inline-block;
  font-size: 1rem;
  vertical-align: middle;
  line-height: 2.9;
`;

const budgetFieldCss = css`
  margin-top: 2rem;
  display: inline-flex;
`;

const budgetInputCss = css`
  .ant-input {
    border: none;
    border-bottom: 2px solid ${COLORS.BRAND[5]};
    border-radius: 0;
    box-shadow: none;
    font-weight: 600;
    width: 100px;
    padding: 0.5rem;
    &:focus {
      border-bottom: 2px solid ${COLORS.PRIMARY[5]};
    }
  }

  .ant-input-group-addon {
    font-weight: 600;
    font-size: 1rem;
    border: none;
    background-color: transparent;
  }
`;

const chartStyle = css`
  height: ${CHART_HEIGHT}px;
  overflow: hidden;

  .ct-series-f .ct-slice-donut {
    stroke: ${COLORS.PRIMARY[5]};
  }

  .ct-label {
    stroke: none;
    color: none;
    font-size: 1.1rem;
    font-weight: 600;
    fill: white;
  }

  @media (max-width: ${BREAKPOINT.md}) {
    height: ${CHART_HEIGHT}px;
    .ct-label {
      font-size: 0.8rem;
    }
  }

  ${draw}
`;

const defaultOptions: Partial<IPieChartOptions> = {
  height: 2 * CHART_HEIGHT,
  donut: true,
  donutWidth: CHART_HEIGHT / 2,
  startAngle: 270,
  total: 200,
  showLabel: true
};

const responsiveOptions = [
  [
    `screen and (max-width: ${BREAKPOINT.md})`,
    {
      height: CHART_HEIGHT,
      donutWidth: CHART_HEIGHT / 3,
      labelOffset: 20,
      // donut: false,
      total: 100
    } as IPieChartOptions
  ]
];

const ChartistGraph = (withRerenderCheck(
  BaseChartistGraph,
  (props, nextProps) => JSON.stringify(props.data) !== JSON.stringify(nextProps.data)
) as any) as React.FC<ChartitGraphPieProps>;

const init = chartist => {
  registerFillAnimation(chartist, 300);
};

const MoneyAllocationChart = () => {
  const [total, setTotal] = useState(5000);
  const [valueMap, setValueMap] = useState({
    Entertainment: 100,
    Accommodation: 2000,
    Utility: 200,
    Groceries: 500,
    Other: 300
  });
  const expenses = Object.values(valueMap).reduce((a, b) => a + b);
  const savings = total - expenses;
  const hasDebt = expenses > total;
  const absoluteTotal = hasDebt ? expenses : total;
  const labels = Object.keys(valueMap).map(capitalize);
  const series = Object.values(valueMap).map(value => (value / absoluteTotal) * 100);
  const savingsPercentage = (savings / total) * 100;

  const data = {
    labels: hasDebt ? labels : [...labels, 'Savings'],
    series: hasDebt ? series : [...series, savingsPercentage]
  };

  const options = defaultOptions;
  const setCategory = (category: string) => (value: number) =>
    setValueMap({ ...valueMap, [category]: value });

  return (
    <Form layout="inline">
      <div className="relative flex justify-center w-full">
        <div className="flex-grow" css={chartStyle}>
          <ChartistGraph
            data={data}
            options={options}
            type="Pie"
            responsiveOptions={responsiveOptions}
            init={init}
          />
        </div>
      </div>
      <Row className="my-4">
        <Col>
          <Sentence>My monthly income is</Sentence>
          <LazyNumberField
            size="large"
            setValue={setTotal}
            value={total}
            addonBefore="$"
            formItemCss={budgetFieldCss}
            css={budgetInputCss}
          />
          <Sentence>and I spend</Sentence>
          {Object.entries(valueMap).map(([key, value]) => (
            <LazyNumberField
              key={key}
              size="large"
              setValue={setCategory(key)}
              value={value}
              addonBefore="$"
              addonAfter={`on ${key}`}
              formItemCss={budgetFieldCss}
              css={budgetInputCss}
            />
          ))}
          {!hasDebt && (
            <Sentence>
              that allows me to save <Highlight positive>{getCurrency(savings)}</Highlight>{' '}
              monthly and <Highlight positive>{getCurrency(savings * 12)}</Highlight>{' '}
              annually which is{' '}
              <Highlight positive>{formatNumber(savingsPercentage)}%</Highlight> of my
              income.
            </Sentence>
          )}
          {hasDebt && (
            <Sentence>
              which forces me to spend{' '}
              <Highlight negative>{getCurrency(Math.abs(savings))}</Highlight> from my savings
              and might require financial help. Reduce expenses now or increase income.
            </Sentence>
          )}
          <Disclaimer />
        </Col>
      </Row>
    </Form>
  );
};

export default MoneyAllocationChart;
