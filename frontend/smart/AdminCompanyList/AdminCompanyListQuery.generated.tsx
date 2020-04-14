import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type AdminCompanyListQueryVariables = {
  offset?: Types.Maybe<Types.Scalars['Int']>,
  limit?: Types.Maybe<Types.Scalars['Int']>,
  sortBy?: Types.Maybe<Types.CompanyField>,
  sortDir?: Types.Maybe<Types.SortDirection>,
  filter?: Types.Maybe<Types.CompanyFilter>
};


export type AdminCompanyListQuery = (
  { __typename?: 'Query' }
  & { companies: (
    { __typename?: 'CompanyCollection' }
    & Pick<Types.CompanyCollection, 'total'>
    & { items: Array<(
      { __typename?: 'Company' }
      & Pick<Types.Company, 'id' | 'name' | 'createdAt' | 'type' | 'serviceType'>
      & { addresses: Array<(
        { __typename?: 'Address' }
        & Pick<Types.Address, 'id' | 'city'>
      )> }
    )> }
  ) }
);


export const AdminCompanyListDocument = gql`
    query adminCompanyList($offset: Int, $limit: Int, $sortBy: CompanyField, $sortDir: SortDirection, $filter: CompanyFilter) {
  companies(offset: $offset, limit: $limit, sortBy: $sortBy, sortDir: $sortDir, filter: $filter) {
    total
    items {
      id
      name
      createdAt
      type
      serviceType
      addresses {
        id
        city
      }
    }
  }
}
    `;
export type AdminCompanyListComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AdminCompanyListQuery, AdminCompanyListQueryVariables>, 'query'>;

    export const AdminCompanyListComponent = (props: AdminCompanyListComponentProps) => (
      <ApolloReactComponents.Query<AdminCompanyListQuery, AdminCompanyListQueryVariables> query={AdminCompanyListDocument} {...props} />
    );
    
export type AdminCompanyListProps<TChildProps = {}> = ApolloReactHoc.DataProps<AdminCompanyListQuery, AdminCompanyListQueryVariables> & TChildProps;
export function withAdminCompanyList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AdminCompanyListQuery,
  AdminCompanyListQueryVariables,
  AdminCompanyListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AdminCompanyListQuery, AdminCompanyListQueryVariables, AdminCompanyListProps<TChildProps>>(AdminCompanyListDocument, {
      alias: 'adminCompanyList',
      ...operationOptions
    });
};

/**
 * __useAdminCompanyListQuery__
 *
 * To run a query within a React component, call `useAdminCompanyListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminCompanyListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminCompanyListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sortBy: // value for 'sortBy'
 *      sortDir: // value for 'sortDir'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminCompanyListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminCompanyListQuery, AdminCompanyListQueryVariables>) {
        return ApolloReactHooks.useQuery<AdminCompanyListQuery, AdminCompanyListQueryVariables>(AdminCompanyListDocument, baseOptions);
      }
export function useAdminCompanyListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminCompanyListQuery, AdminCompanyListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AdminCompanyListQuery, AdminCompanyListQueryVariables>(AdminCompanyListDocument, baseOptions);
        }
export type AdminCompanyListQueryHookResult = ReturnType<typeof useAdminCompanyListQuery>;
export type AdminCompanyListLazyQueryHookResult = ReturnType<typeof useAdminCompanyListLazyQuery>;
export type AdminCompanyListQueryResult = ApolloReactCommon.QueryResult<AdminCompanyListQuery, AdminCompanyListQueryVariables>;