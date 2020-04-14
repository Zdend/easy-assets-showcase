import * as Types from '../../generated/types';

import gql from 'graphql-tag';

export type AddressFragmentFragment = (
  { __typename?: 'Address' }
  & Pick<Types.Address, 'id' | 'suburb' | 'postcode' | 'state' | 'city' | 'lat' | 'long'>
);

export const AddressFragmentFragmentDoc = gql`
    fragment AddressFragment on Address {
  id
  suburb
  postcode
  state
  city
  lat
  long
}
    `;