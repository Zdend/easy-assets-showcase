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


export type CompaniesQueryVariables = {
  offset?: Types.Maybe<Types.Scalars['Int']>,
  limit?: Types.Maybe<Types.Scalars['Int']>,
  sortBy?: Types.Maybe<Types.CompanyField>,
  sortDir?: Types.Maybe<Types.SortDirection>,
  filter?: Types.Maybe<Types.CompanyFilter>
};


export type CompaniesQuery = (
  { __typename?: 'Query' }
  & { companies: (
    { __typename?: 'CompanyCollection' }
    & Pick<Types.CompanyCollection, 'total'>
    & { items: Array<(
      { __typename?: 'Company' }
      & { addresses: Array<(
        { __typename?: 'Address' }
        & Pick<Types.Address, 'id' | 'city' | 'suburb'>
      )> }
      & CompanyFragmentFragment
    )> }
  ) }
);


export const CompaniesDocument = gql`
    query companies($offset: Int, $limit: Int, $sortBy: CompanyField, $sortDir: SortDirection, $filter: CompanyFilter) {
  companies(offset: $offset, limit: $limit, sortBy: $sortBy, sortDir: $sortDir, filter: $filter) {
    total
    items {
      ...CompanyFragment
      addresses {
        id
        city
        suburb
      }
    }
  }
}
    ${CompanyFragmentFragmentDoc}`;
export type CompaniesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CompaniesQuery, CompaniesQueryVariables>, 'query'>;

    export const CompaniesComponent = (props: CompaniesComponentProps) => (
      <ApolloReactComponents.Query<CompaniesQuery, CompaniesQueryVariables> query={CompaniesDocument} {...props} />
    );
    
export type CompaniesProps<TChildProps = {}> = ApolloReactHoc.DataProps<CompaniesQuery, CompaniesQueryVariables> & TChildProps;
export function withCompanies<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CompaniesQuery,
  CompaniesQueryVariables,
  CompaniesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CompaniesQuery, CompaniesQueryVariables, CompaniesProps<TChildProps>>(CompaniesDocument, {
      alias: 'companies',
      ...operationOptions
    });
};

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sortBy: // value for 'sortBy'
 *      sortDir: // value for 'sortDir'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
        return ApolloReactHooks.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions);
      }
export function useCompaniesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = ApolloReactCommon.QueryResult<CompaniesQuery, CompaniesQueryVariables>;