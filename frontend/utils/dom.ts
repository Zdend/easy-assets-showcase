import { BREAKPOINT } from '@/styles/variables';

export const getBreakpoint = (width: number): BREAKPOINT => {
  return Object.values(BREAKPOINT).find(breakpoint => {
    const breakpointWidth = +breakpoint.replace('px', '');
    return width < breakpointWidth;
  });
};
