import * as Types from '../../generated/types';

import gql from 'graphql-tag';

export type ViewerFragmentFragment = (
  { __typename?: 'Viewer' }
  & Pick<Types.Viewer, 'id' | 'name' | 'firstName' | 'lastName' | 'email'>
);

export const ViewerFragmentFragmentDoc = gql`
    fragment ViewerFragment on Viewer {
  id
  name
  firstName
  lastName
  email
}
    `;