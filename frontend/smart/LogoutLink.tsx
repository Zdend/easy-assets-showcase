import React from 'react';
import { Spin } from 'antd';
import { useRouter, NextRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';
import DefaultClient from 'apollo-boost';
import { notify } from '@/utils/notification';
import { handleGraphQLErrors } from '@/utils/error';
import { useLogoutMutation } from '@/graphql/mutations/logout.generated';

const handleLogout = (
  logout: Function,
  router: NextRouter,
  client: DefaultClient<any>
) => async e => {
  e.preventDefault();
  try {
    await logout();
    notify('success', 'You have been logged out!');
  } catch (error) {
    notify('error', handleGraphQLErrors(error));
  } finally {
    await router.push('/login');
    await client.clearStore();
  }
};

interface Props {
  children?: React.ElementType;
}

function LogoutLink({ children }) {
  const [logout, { loading }] = useLogoutMutation();
  const router = useRouter();
  const client = useApolloClient();

  return (
    <a href="/login" onClick={handleLogout(logout, router, client)}>
      {children} Logout
      {loading && <Spin />}
    </a>
  );
}

export default LogoutLink;
