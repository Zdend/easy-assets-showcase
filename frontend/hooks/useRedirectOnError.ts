import { useEffect } from 'react';
import { ApolloError } from 'apollo-boost';
import { useRouter } from 'next/router';
import { GRAPHQL_ERRORS } from '@/utils/constants';

const useRedirectOnError = (apolloError: ApolloError) => {
  const router = useRouter();
  useEffect(() => {
    if (apolloError && apolloError.graphQLErrors) {
      apolloError.graphQLErrors.find(error => {
        if (error?.extensions?.code === GRAPHQL_ERRORS.NOT_FOUND) {
          router?.replace('/404');
          return true;
        }
        return false;
      });
    }
  }, [apolloError]);
};

export default useRedirectOnError;
