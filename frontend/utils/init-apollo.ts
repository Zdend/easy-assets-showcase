import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';
import { isBrowser, isDocker } from './constants';
import { errorLink } from './error';
import { authLink } from './auth';

interface ApolloOptions {
  getCookies: Function;
}

let apolloClient = null;

function create(initialState: any, options: ApolloOptions) {
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      errorLink,
      authLink(options.getCookies),
      createUploadLink({
        uri: isDocker && isBrowser ? 'http://localhost:4000/graphql' : process.env.BACKEND_URL,
        credentials: 'include',
        fetch
      })
    ]),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState: any, options: ApolloOptions) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
