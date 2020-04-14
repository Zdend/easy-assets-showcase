import { setContext } from 'apollo-link-context';
import DefaultClient from 'apollo-boost';
import { Viewer } from '@/generated/types';
import { ViewerDocument } from '@/graphql/queries/viewer.generated';

export interface AuthPayload {
  loggedIn: boolean;
  user: null | Viewer;
}
export function getCookiesIsomorphic(context: any = {}) {
  return context?.req?.headers ? context.req.headers.cookie : document.cookie;
}

export const authLink = (getCookies: Function) =>
  setContext((_, { headers }) => {
    const Cookie = getCookies();
    return {
      headers: {
        ...headers,
        Cookie
      }
    };
  });

export const fetchViewer = async (apolloClient: DefaultClient<any>): Promise<AuthPayload> => {
  const { data, errors } = await apolloClient.query({ query: ViewerDocument });
  if (data && data.viewer && !errors) {
    return {
      loggedIn: true,
      user: data.viewer
    };
  }
  return { loggedIn: false, user: null };
};
