import React, { useState } from 'react';
import { ILineChartOptions, IResponsiveOptionTuple } from 'chartist';
import { Slider, Form, Checkbox, Row, Col } from 'antd';
import { css } from '@emotion/core';
import { BASE_UNIT, BREAKPOINT, COLORS } from '@/styles/variables';
import ChartistGraph from '@/components/ChartistGraph';
import { includeEveryN, getCompundInterestData } from '@/utils/dataset';
import { getCurrency } from '@/utils/number';
import LazyNumberField from './GenericForm/LazyNumberField';
import ctPointLabels from '@/utils/chart/point-label-plugin';
import { explodingStroke, draw } from '@/styles/animations';
import Disclaimer from '@/components/Disclaimer';
import { SubTotal, Highlight } from './Typography';
import FeedbackButton from './FeedbackButton';

const CHART_HEIGHT = 400;

const mobileWidth = css`
  @media (max-width: ${BREAKPOINT.xs}) {
    width: 45%;
    flex-wrap: wrap !important;
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
    stroke: ${COLORS.SUCCESS[5]};
    opacity: 1;

    .ct-area {
      fill: ${COLORS.SUCCESS[5]};
    }
    .ct-line {
      stroke: ${COLORS.SUCCESS[5]};
    }
    .ct-point {
      stroke: ${COLORS.SUCCESS[5]};
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
    labelInterpolationFnc: includeEveryN(3)
  },
  axisY: {
    offset: BASE_UNIT * 7,
    labelInterpolationFnc: includeEveryN(3, value => `${getCurrency(value / 1000)}k`)
  },
  fullWidth: true,
  series: {
    a: {
      showArea: true,
      showPoint: false
    },
    b: {
      showArea: true
    }
  },
  plugins: [
    ctPointLabels({
      textAnchor: 'end',
      align: 'left',
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

const CompoundInterestChart = () => {
  const [years, setYears] = useState(15);
  const [principal, setPrincipal] = useState(100000);
  const [interest, setInterest] = useState(10);
  const [contribution, setContribution] = useState(10000);
  const [inflation, setInflation] = useState(0);
  const [volatility, setVolatility] = useState(0);
  const {
    years: yearSet,
    totalValue,
    totalInterest,
    values,
    totalContribution,
    contributions
  } = getCompundInterestData(
    years,
    principal,
    interest / 100 - inflation,
    contribution,
    volatility
  );
  const data = {
    labels: yearSet,
    series: [
      {
        name: 'a',
        data: contributions
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
      <LazyNumberField
        label="Initial Investment"
        setValue={setPrincipal}
        value={principal}
        formItemCss={mobileWidth}
      />

      <LazyNumberField
        label="Annual Savings"
        setValue={setContribution}
        value={contribution}
        formItemCss={mobileWidth}
      />

      <Form.Item>
        <Checkbox checked={inflation > 0} onChange={e => setInflation(e.target.checked ? 0.02 : 0)}>
          Set 2% inflation
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          checked={volatility > 0}
          onChange={e => setVolatility(e.target.checked ? 0.2 : 0)}
        >
          Set Market fluctuations
        </Checkbox>
      </Form.Item>
      
      <Row  justify="center" className="mt-6 w-full">
        <Col>
          <FeedbackButton type="primary" size="large" className="px-10">
            Calculate
          </FeedbackButton>
        </Col>
      </Row>

      <div className="flex w-full my-8">
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
            min={1}
            max={20}
            step={1}
            onChange={setInterest as any}
            value={interest}
            vertical
            tooltipVisible
            tooltipPlacement="right"
            tipFormatter={() => `${interest}% interest`}
          />
        </div>
      </div>

      <Form.Item className="mt-12 w-full">
        <Slider
          min={1}
          max={60}
          onChange={setYears as any}
          value={years}
          tooltipPlacement="top"
          tooltipVisible
          tipFormatter={() => `${years} years`}
        />
      </Form.Item>

      <SubTotal>
        In {years} years ({new Date().getFullYear() + years}) you will have{' '}
        <Highlight positive={totalValue > 0} negative={totalValue < 0}>
          {getCurrency(totalValue)}
        </Highlight>{' '}
        if you now invest <Highlight>{getCurrency(principal)}</Highlight> with{' '}
        <Highlight>{interest}%</Highlight> interest and save{' '}
        <Highlight>{getCurrency(contribution)}</Highlight> every year. Compound
        interest will earn you{' '}
        <Highlight positive={totalInterest > 0} negative={totalInterest < 0}>
          {getCurrency(totalInterest)}
        </Highlight>
        . In {years} years you have directly contributed{' '}
        <Highlight>{getCurrency(totalContribution)}</Highlight>.
      </SubTotal>
      <Disclaimer />
    </Form>
  );
};

export default CompoundInterestChart;
