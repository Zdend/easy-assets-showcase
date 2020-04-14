import * as Types from '../../generated/types';

import { AddressFragmentFragment } from '../fragments/address.generated';
import gql from 'graphql-tag';
import { AddressFragmentFragmentDoc } from '../fragments/address.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type AddressesQueryVariables = {
  offset?: Types.Maybe<Types.Scalars['Int']>,
  limit?: Types.Maybe<Types.Scalars['Int']>,
  sortBy?: Types.Maybe<Types.AddressField>,
  sortDir?: Types.Maybe<Types.SortDirection>,
  filter?: Types.Maybe<Types.AddressFilter>
};


export type AddressesQuery = (
  { __typename?: 'Query' }
  & { addresses: (
    { __typename?: 'AddressCollection' }
    & Pick<Types.AddressCollection, 'total'>
    & { items: Array<(
      { __typename?: 'Address' }
      & AddressFragmentFragment
    )> }
  ) }
);


export const AddressesDocument = gql`
    query addresses($offset: Int, $limit: Int, $sortBy: AddressField, $sortDir: SortDirection, $filter: AddressFilter) {
  addresses(offset: $offset, limit: $limit, sortBy: $sortBy, sortDir: $sortDir, filter: $filter) {
    total
    items {
      ...AddressFragment
    }
  }
}
    ${AddressFragmentFragmentDoc}`;
export type AddressesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AddressesQuery, AddressesQueryVariables>, 'query'>;

    export const AddressesComponent = (props: AddressesComponentProps) => (
      <ApolloReactComponents.Query<AddressesQuery, AddressesQueryVariables> query={AddressesDocument} {...props} />
    );
    
export type AddressesProps<TChildProps = {}> = ApolloReactHoc.DataProps<AddressesQuery, AddressesQueryVariables> & TChildProps;
export function withAddresses<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddressesQuery,
  AddressesQueryVariables,
  AddressesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AddressesQuery, AddressesQueryVariables, AddressesProps<TChildProps>>(AddressesDocument, {
      alias: 'addresses',
      ...operationOptions
    });
};

/**
 * __useAddressesQuery__
 *
 * To run a query within a React component, call `useAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sortBy: // value for 'sortBy'
 *      sortDir: // value for 'sortDir'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAddressesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
        return ApolloReactHooks.useQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, baseOptions);
      }
export function useAddressesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, baseOptions);
        }
export type AddressesQueryHookResult = ReturnType<typeof useAddressesQuery>;
export type AddressesLazyQueryHookResult = ReturnType<typeof useAddressesLazyQuery>;
export type AddressesQueryResult = ApolloReactCommon.QueryResult<AddressesQuery, AddressesQueryVariables>;