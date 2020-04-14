import React, { useRef, useEffect } from 'react';
import Chartist, {
  IChartOptions,
  ILineChartOptions,
  IPieChartOptions,
  IResponsiveOptionTuple,
  IBarChartOptions,
  ChartistStatic
} from 'chartist';
import { InterpolationWithTheme } from '@emotion/core';
import throttleRender from '@/hoc/withThrottle';
import useWindowSize from '@/hooks/useWindowSize';
import { BREAKPOINT_WIDTH } from '@/styles/variables';
import styled from '@emotion/styled';

type ChartistInstance = ChartistStatic['Line'] | ChartistStatic['Pie'] | ChartistStatic['Bar'];

export interface ChartistGraphProps {
  type: string;
  data: object;
  options?: IChartOptions;
  responsiveOptions?: any;
  init?: (chartist: ChartistInstance) => void;
  css?: InterpolationWithTheme<any>;
}

export interface ChartitGraphLineProps extends ChartistGraphProps {
  type: 'Line';
  options?: ILineChartOptions;
  responseOptions?: Array<IResponsiveOptionTuple<ILineChartOptions>>;
}

export interface ChartitGraphPieProps extends ChartistGraphProps {
  type: 'Pie';
  options?: IPieChartOptions;
  responseOptions?: Array<IResponsiveOptionTuple<IPieChartOptions>>;
}

export interface ChartitGraphBarProps extends ChartistGraphProps {
  type: 'Bar';
  options: IBarChartOptions;
  responseOptions?: Array<IResponsiveOptionTuple<IBarChartOptions>>;
}

const ChartistWrapper = styled.div`
  & > svg {
    overflow: initial;
  }
`;

const ChartistGraph = ({ type, data, options, responsiveOptions, init }: ChartistGraphProps) => {
  const containerRef = useRef<HTMLDivElement>();
  const chartistRef = useRef<ChartistInstance>();
  const { width } = useWindowSize(1000);

  useEffect(() => {
    chartistRef.current = new Chartist[type](
      containerRef.current,
      data,
      options,
      responsiveOptions
    );
    if (typeof init === 'function') {
      init(chartistRef.current);
    }

    if (width < BREAKPOINT_WIDTH.sm) {
      chartistRef.current.on('created', () => {
        chartistRef.current.detach();
      });
    }

    return () => {
      if (chartistRef.current) {
        try {
          chartistRef.current.detach();
        } catch (err) {
          throw new Error('Internal chartist error');
        }
      }
    };
  }, [data, options, width]);

  return <ChartistWrapper className="ct-chart" ref={containerRef} />;
};

export default (throttleRender(ChartistGraph, 500) as any) as React.FC<ChartistGraphProps>;
export const BaseChartistGraph = ChartistGraph;
