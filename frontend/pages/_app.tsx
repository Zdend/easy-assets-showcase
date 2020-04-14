import App from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import DefaultClient from 'apollo-boost';
import { Global } from '@emotion/core';
import withGlobals from '@/hoc/withGlobals';
import { globalStyles } from '@/styles/global';
import { LocationContext, Location } from '@/utils/init-location';
import 'cropperjs/dist/cropper.css';
import 'antd/dist/antd.less';
import '@/styles/tailwind.css';
import 'chartist/dist/chartist.css';

interface Props {
  apolloClient: DefaultClient<any>;
  location: Location;
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, apolloClient, location } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <LocationContext.Provider value={location}>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </LocationContext.Provider>
      </ApolloProvider>
    );
  }
}

export default withGlobals(MyApp);
