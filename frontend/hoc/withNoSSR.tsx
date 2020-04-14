import React, { ComponentType, FunctionComponent } from 'react';
import dynamic from 'next/dynamic';

import { Skeleton } from 'antd';

/**
 * Disabling SSR allows us to prevent headache when relying on browser dependent code
 * like router.
 *
 * Also not everything needs to be server side rendered, which can save us some lambda minutes
 */
const withNoSSR = (Component: ComponentType | FunctionComponent) => {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: () => <Skeleton active />
  });
};

export default withNoSSR;
