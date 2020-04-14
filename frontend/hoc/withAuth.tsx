import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { fetchViewer, AuthPayload } from '@/utils/auth';
import { redirect } from '@/utils/routing';

interface AuthProps {
  auth: AuthPayload;
}

const defaultAuthPayload = { loggedIn: false, user: null };
export const AuthContext = React.createContext(defaultAuthPayload);

const getDisplayName = Component => Component.displayName || Component.name || 'Component';

interface AuthOptions {
  allowAnonymous?: boolean;
}

const withAuth = <P extends Record<string, any>>(
  WrappedComponent: NextComponentType,
  options?: AuthOptions
) =>
  class extends React.Component<P> {
    static displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx: NextPageContext) {
      let auth: AuthPayload = defaultAuthPayload;
      try {
        auth = await fetchViewer(ctx.apolloClient);

        if (!options?.allowAnonymous && (!auth.loggedIn || !auth.user)) {
          redirect(ctx, '/login');
        }
      } catch (e) {
        redirect(ctx, '/login');
      }

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, auth };
    }

    render() {
      const { auth } = this.props as P & AuthProps;
      if (!options?.allowAnonymous && (!auth.loggedIn || !auth.user)) {
        return null;
      }
      return (
        <AuthContext.Provider value={auth || defaultAuthPayload}>
          <WrappedComponent {...(this.props as P)} />
        </AuthContext.Provider>
      );
    }
  };

export default withAuth;
