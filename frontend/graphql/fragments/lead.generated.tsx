import * as Types from '../../generated/types';

import gql from 'graphql-tag';

export type LeadFragmentFragment = (
  { __typename?: 'Lead' }
  & Pick<Types.Lead, 'id' | 'name' | 'email' | 'createdAt' | 'phoneNumber' | 'city' | 'companyName' | 'requirements'>
);

export const LeadFragmentFragmentDoc = gql`
    fragment LeadFragment on Lead {
  id
  name
  email
  createdAt
  phoneNumber
  city
  companyName
  requirements
}
    `;