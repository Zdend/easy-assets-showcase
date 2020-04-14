import * as Types from '../../generated/types';

import gql from 'graphql-tag';

export type FeatureFragmentFragment = (
  { __typename?: 'Feature' }
  & Pick<Types.Feature, 'id' | 'name' | 'slug' | 'type' | 'description' | 'tags'>
);

export const FeatureFragmentFragmentDoc = gql`
    fragment FeatureFragment on Feature {
  id
  name
  slug
  type
  description
  tags
}
    `;