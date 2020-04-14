import { useEffect, useState } from 'react';
import { Router } from 'next/router';

export default function usePageTransition() {
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    const transitionStart = () => setTransitioning(true);
    const transitionFinish = () => setTransitioning(false);
    Router.events.on('routeChangeStart', transitionStart);
    Router.events.on('routeChangeComplete', transitionFinish);
    Router.events.on('routeChangeError', transitionFinish);
    return () => {
      Router.events.off('routeChangeStart', transitionStart);
      Router.events.off('routeChangeComplete', transitionFinish);
      Router.events.off('routeChangeError', transitionFinish);
    };
  }, []);

  return transitioning;
}
