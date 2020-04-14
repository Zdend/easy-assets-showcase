import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import DefaultClient from 'apollo-boost';
import { NextPageContext } from 'next';
import { NextRouter } from 'next/router';
import initApollo from '@/utils/init-apollo';
import { getCookiesIsomorphic } from '@/utils/auth';
import initLocation from '@/utils/init-location';

interface AppContext {
  Component: React.Component;
  router: NextRouter;
  ctx: NextPageContext;
}

export default App => {
  return class Apollo extends React.Component {
    apolloClient: DefaultClient<any>;

    static displayName = 'withGlobals(App)';

    static async getInitialProps(context: AppContext) {
      const { Component, router, ctx } = context;

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = initApollo(null, {
        getCookies: () => getCookiesIsomorphic(ctx)
      });

      ctx.apolloClient = apolloClient;

      const location = initLocation(router, ctx);

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(context);
      }

      if (typeof window === 'undefined') {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apolloClient}
              location={location}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...appProps,
        apolloState,
        location
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getCookies: () => getCookiesIsomorphic()
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
