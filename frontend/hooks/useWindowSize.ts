import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

export default function useWindowSize(delay: number = 500) {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const handleResize = throttle(() => setWindowSize(getSize()), delay);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
