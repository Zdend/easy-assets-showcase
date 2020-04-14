import * as Types from '../../generated/types';

import { CompanyFragmentFragment } from '../fragments/company.generated';
import gql from 'graphql-tag';
import { CompanyFragmentFragmentDoc } from '../fragments/company.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type CompanyQueryVariables = {
  id: Types.Scalars['ID']
};


export type CompanyQuery = (
  { __typename?: 'Query' }
  & { company: (
    { __typename?: 'Company' }
    & { features: Array<(
      { __typename?: 'Feature' }
      & Pick<Types.Feature, 'id'>
    )>, addresses: Array<(
      { __typename?: 'Address' }
      & Pick<Types.Address, 'id'>
    )>, manager: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id'>
    )> }
    & CompanyFragmentFragment
  ) }
);


export const CompanyDocument = gql`
    query company($id: ID!) {
  company(id: $id) {
    ...CompanyFragment
    features {
      id
    }
    addresses {
      id
    }
    manager {
      id
    }
  }
}
    ${CompanyFragmentFragmentDoc}`;
export type CompanyComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CompanyQuery, CompanyQueryVariables>, 'query'> & ({ variables: CompanyQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const CompanyComponent = (props: CompanyComponentProps) => (
      <ApolloReactComponents.Query<CompanyQuery, CompanyQueryVariables> query={CompanyDocument} {...props} />
    );
    
export type CompanyProps<TChildProps = {}> = ApolloReactHoc.DataProps<CompanyQuery, CompanyQueryVariables> & TChildProps;
export function withCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CompanyQuery,
  CompanyQueryVariables,
  CompanyProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CompanyQuery, CompanyQueryVariables, CompanyProps<TChildProps>>(CompanyDocument, {
      alias: 'company',
      ...operationOptions
    });
};

/**
 * __useCompanyQuery__
 *
 * To run a query within a React component, call `useCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompanyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompanyQuery, CompanyQueryVariables>) {
        return ApolloReactHooks.useQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, baseOptions);
      }
export function useCompanyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompanyQuery, CompanyQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, baseOptions);
        }
export type CompanyQueryHookResult = ReturnType<typeof useCompanyQuery>;
export type CompanyLazyQueryHookResult = ReturnType<typeof useCompanyLazyQuery>;
export type CompanyQueryResult = ApolloReactCommon.QueryResult<CompanyQuery, CompanyQueryVariables>;