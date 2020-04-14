import * as Types from '../../generated/types';

import gql from 'graphql-tag';

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'name' | 'email' | 'role'>
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  email
  role
}
    `;