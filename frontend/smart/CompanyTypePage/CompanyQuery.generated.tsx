import * as Types from '../../generated/types';

import { FeatureFragmentFragment } from '../../graphql/fragments/feature.generated';
import { CompanyFragmentFragment } from '../../graphql/fragments/company.generated';
import gql from 'graphql-tag';
import { CompanyFragmentFragmentDoc } from '../../graphql/fragments/company.generated';
import { FeatureFragmentFragmentDoc } from '../../graphql/fragments/feature.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;



export type PublicCompanyQueryVariables = {
  id: Types.Scalars['ID']
};


export type PublicCompanyQuery = (
  { __typename?: 'Query' }
  & { company: (
    { __typename?: 'Company' }
    & { features: Array<(
      { __typename?: 'Feature' }
      & FeatureFragmentFragment
    )>, addresses: Array<(
      { __typename?: 'Address' }
      & Pick<Types.Address, 'id' | 'city' | 'postcode' | 'suburb'>
    )> }
    & CompanyFragmentFragment
  ) }
);


export const PublicCompanyDocument = gql`
    query publicCompany($id: ID!) {
  company(id: $id) {
    ...CompanyFragment
    features {
      ...FeatureFragment
    }
    addresses {
      id
      city
      postcode
      suburb
    }
  }
}
    ${CompanyFragmentFragmentDoc}
${FeatureFragmentFragmentDoc}`;
export type PublicCompanyComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PublicCompanyQuery, PublicCompanyQueryVariables>, 'query'> & ({ variables: PublicCompanyQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PublicCompanyComponent = (props: PublicCompanyComponentProps) => (
      <ApolloReactComponents.Query<PublicCompanyQuery, PublicCompanyQueryVariables> query={PublicCompanyDocument} {...props} />
    );
    
export type PublicCompanyProps<TChildProps = {}> = ApolloReactHoc.DataProps<PublicCompanyQuery, PublicCompanyQueryVariables> & TChildProps;
export function withPublicCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PublicCompanyQuery,
  PublicCompanyQueryVariables,
  PublicCompanyProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, PublicCompanyQuery, PublicCompanyQueryVariables, PublicCompanyProps<TChildProps>>(PublicCompanyDocument, {
      alias: 'publicCompany',
      ...operationOptions
    });
};

/**
 * __usePublicCompanyQuery__
 *
 * To run a query within a React component, call `usePublicCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicCompanyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublicCompanyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicCompanyQuery, PublicCompanyQueryVariables>) {
        return ApolloReactHooks.useQuery<PublicCompanyQuery, PublicCompanyQueryVariables>(PublicCompanyDocument, baseOptions);
      }
export function usePublicCompanyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicCompanyQuery, PublicCompanyQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PublicCompanyQuery, PublicCompanyQueryVariables>(PublicCompanyDocument, baseOptions);
        }
export type PublicCompanyQueryHookResult = ReturnType<typeof usePublicCompanyQuery>;
export type PublicCompanyLazyQueryHookResult = ReturnType<typeof usePublicCompanyLazyQuery>;
export type PublicCompanyQueryResult = ApolloReactCommon.QueryResult<PublicCompanyQuery, PublicCompanyQueryVariables>;