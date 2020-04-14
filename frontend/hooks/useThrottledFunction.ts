import throttle from 'lodash.throttle';
import { useCallback } from 'react';

const useThrottledCallback = (callback: Function, delay = 300) => {
  const throttledOnChange = useCallback(throttle(callback, delay), []);
  return throttledOnChange;
};

export default useThrottledCallback;
