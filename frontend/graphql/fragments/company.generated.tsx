import * as Types from '../../generated/types';

import gql from 'graphql-tag';

export type CompanyFragmentFragment = (
  { __typename?: 'Company' }
  & Pick<Types.Company, 'id' | 'name' | 'slug' | 'description' | 'logo' | 'createdAt' | 'type' | 'serviceType' | 'status' | 'affiliateUrl' | 'websiteUrl' | 'premium' | 'languages' | 'pricing' | 'tags'>
);

export const CompanyFragmentFragmentDoc = gql`
    fragment CompanyFragment on Company {
  id
  name
  slug
  description
  logo
  createdAt
  type
  serviceType
  status
  affiliateUrl
  websiteUrl
  premium
  languages
  pricing
  tags
}
    `;