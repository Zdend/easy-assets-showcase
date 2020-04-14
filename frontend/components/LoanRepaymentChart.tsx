import React, { useState } from 'react';
import { ILineChartOptions, IResponsiveOptionTuple } from 'chartist';
import { Slider, Form, Row, Col } from 'antd';
import { css } from '@emotion/core';
import { BASE_UNIT, BREAKPOINT, COLORS } from '@/styles/variables';
import ChartistGraph from '@/components/ChartistGraph';
import { includeEveryN, getLoanRepaymentData } from '@/utils/dataset';
import { formatNumber, getCurrency } from '@/utils/number';
import ctPointLabels from '@/utils/chart/point-label-plugin';
import { explodingStroke, draw } from '@/styles/animations';
import LazyNumberField from '@/components/GenericForm/LazyNumberField';
import Disclaimer from '@/components/Disclaimer';
import { SubTotal, Highlight } from './Typography';
import FeedbackButton from './FeedbackButton';

const CHART_HEIGHT = 400;

const mobileWidth = css`
  @media (max-width: ${BREAKPOINT.xs}) {
    width: 50%;
    flex-flow: wrap;
    margin-bottom: 1rem;
  }
`;

const chartStyle = css`
  height: ${CHART_HEIGHT}px;
  .ct-grids line {
    stroke: ${COLORS.PRIMARY[2]};
  }

  .ct-series-a,
  .ct-series-b {
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation: draw 1s 0s ease both;
    fill: none;
  }

  .ct-series-a {
    stroke: ${COLORS.ERROR[5]};
    opacity: 0.8;
  }

  .ct-series-b {
    stroke: ${COLORS.WARNING[5]};
    opacity: 1;

    .ct-area {
      fill: ${COLORS.WARNING[5]};
    }
    .ct-line {
      stroke: ${COLORS.WARNING[5]};
    }
    .ct-point {
      stroke: ${COLORS.WARNING[5]};
    }
  }

  .ct-label {
    stroke: ${COLORS.GREY[6]};
  }

  .ct-point {
    animation: exploding-stroke 1s ease-out infinite;
  }

  ${explodingStroke}
  ${draw}
`;

const defaultOptions: Partial<ILineChartOptions> = {
  height: CHART_HEIGHT,
  axisX: {
    offset: BASE_UNIT * 2,
    stretch: true,
    showLabel: true,
    labelInterpolationFnc: includeEveryN(5)
  },
  axisY: {
    offset: BASE_UNIT * 10,
    labelInterpolationFnc: includeEveryN(3, getCurrency)
  },
  fullWidth: true,
  series: {
    a: {
      showArea: true
    },
    b: {
      showArea: true
    }
  },
  plugins: [
    ctPointLabels({
      textAnchor: 'end',
      align: 'center',
      labelInterpolationFnc: includeEveryN(5, value => `${getCurrency(value / 1000)}k`)
    })
  ]
};

const responsiveOptions: IResponsiveOptionTuple<ILineChartOptions>[] = [
  [
    `screen and (max-width: ${BREAKPOINT.sm})`,
    {
      showPoint: true,
      axisX: {
        labelInterpolationFnc: includeEveryN(5)
      },
      axisY: {
        offset: 0,
        showLabel: false
      }
    }
  ]
];

const LoanRepaymentChart = () => {
  const [repayment, setRepayment] = useState(3000);
  const [principal, setPrincipal] = useState(300000);
  const [interest, setInterest] = useState(2.8);
  const annualRepayments = repayment * 12;
  const {
    years,
    amountOwed,
    totalRepayments,
    lastYear,
    totalInterest,
    values,
    interests
  } = getLoanRepaymentData(principal, interest / 100, annualRepayments);
  const interestToPrincipal = 100 * (totalInterest / principal);
  const data = {
    labels: years,
    series: [
      {
        name: 'a',
        data: interests
      },
      {
        name: 'b',
        data: values
      }
    ]
  };
  const options = defaultOptions;

  return (
    <Form layout="inline">
      <Row className="w-full">
        <Col flex="auto">
          <LazyNumberField
            label="I would like to borrow"
            setValue={setPrincipal}
            value={principal}
            formItemCss={mobileWidth}
          />
        </Col>
        <Col flex="auto" className="ml-2">
          <Form.Item className="font-bold text-right">
            <span className="warning--text">Amount Owed</span>
            <span className="error--text ml-4">Interest Paid</span>
          </Form.Item>
        </Col>
      </Row>

      <Row  justify="center" className="mt-6 w-full">
        <Col>
          <FeedbackButton type="primary" size="large" className="px-10">
            Calculate
          </FeedbackButton>
        </Col>
      </Row>

      <div className="flex my-8 w-full">
        <div className="flex-grow" css={chartStyle}>
          <ChartistGraph
            data={data}
            options={options}
            type="Line"
            responsiveOptions={responsiveOptions}
          />
        </div>
        <div>
          <Slider
            min={0}
            max={10}
            step={0.1}
            onChange={setInterest as any}
            value={interest}
            vertical
            tooltipVisible
            tooltipPlacement="right"
            tipFormatter={() => `${interest}% interest`}
          />
        </div>
      </div>

      <Form.Item className="w-full">
        <Slider
          className="mt-12"
          min={100}
          max={10000}
          step={100}
          onChange={setRepayment as any}
          value={repayment}
          tooltipPlacement="top"
          tooltipVisible
          tipFormatter={() => `${getCurrency(repayment)} monthly repayment`}
        />
      </Form.Item>

      <SubTotal>
        {amountOwed > 0 && (
          <div>
            <Highlight negative>You will never repay this loan! </Highlight>
            Increase monthly repayments, decreased amount of money borrowed or find loan provider
            with a lower interest rate.
          </div>
        )}
        {amountOwed === 0 && (
          <div>
            You will repay your loan in{' '}
            <Highlight negative={lastYear > 20} positive={lastYear <= 20}>{lastYear}</Highlight>{' '}
            years if you keep repaying{' '}
            <Highlight positive>{getCurrency(annualRepayments)}</Highlight> per year. You
            will pay <Highlight negative>{getCurrency(totalInterest)}</Highlight> in interest
            which is{' '}
            <Highlight negative={interestToPrincipal >= 16} positive={interestToPrincipal < 16}>
              {formatNumber(interestToPrincipal)}%
            </Highlight>{' '}
            of <Highlight>{getCurrency(principal)}</Highlight> that you borrowed. Total
            amount paid <Highlight>{getCurrency(totalRepayments)}.</Highlight>
          </div>
        )}
      </SubTotal>
      <Disclaimer />
    </Form>
  );
};

export default LoanRepaymentChart;
