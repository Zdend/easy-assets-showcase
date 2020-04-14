import { ApolloError } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import Router from 'next/router';
import { isBrowser } from './constants';
import { notify } from './notification';

export const handleGraphQLErrors = (error: ApolloError) => {
  const message = error.graphQLErrors.map(graphqlError => graphqlError.message).join('\n');
  return message || 'Server Error :-(';
};

export const errorLink = onError(({ graphQLErrors }) => {
  (graphQLErrors || []).forEach(error => {
    const { code } = (error || {}).extensions || {};
    if (isBrowser && code === 'UNAUTHENTICATED' && !/\/login/.test(window.location.pathname)) {
      Router.push('/login');
      notify('error', 'You should not be here! Sign in first.');
    }
  });
});
