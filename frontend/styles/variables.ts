import { generate } from '@ant-design/colors';

export const SANS_SERIF_FONT = `'Nunito Sans', Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`;

export const COLORS = {
  PRIMARY: generate('#7fba00'),
  BRAND: generate('#007364'),
  ACCENT: generate('#f1904f'),
  SUCCESS: generate('#4CAF50'),
  ERROR: generate('#F44336'),
  WARNING: generate('#FF9800'),
  INFO: generate('#2196F3'),
  GREY: generate('#a5adb7'),
  PURPLE: generate('#8c2d5d')
};

export const SHADES = {
  BLACK: '#000',
  WHITE: '#fff'
};

export const BASE_UNIT = 8;

export const BORDER_RADIUS = {
  SMALL: '2px',
  MEDIUM: '4px',
  LARGE: '10px'
};

export enum BREAKPOINT {
  xs = '575px',
  sm = '576px',
  md = '768px',
  lg = '992px',
  xl = '1200px',
  xxl = '1600px'
}

type BreakpointKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type BreakpointWidth = {
  [key in BreakpointKeys]: number;
};
export const BREAKPOINT_WIDTH: BreakpointWidth = Object.entries(BREAKPOINT).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: +value.replace('px', '')
  }),
  {}
) as BreakpointWidth;
