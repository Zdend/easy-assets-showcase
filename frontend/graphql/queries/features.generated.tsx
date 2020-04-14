import * as Types from '../../generated/types';

import { FeatureFragmentFragment } from '../fragments/feature.generated';
import gql from 'graphql-tag';
import { FeatureFragmentFragmentDoc } from '../fragments/feature.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type FeaturesQueryVariables = {
  offset?: Types.Maybe<Types.Scalars['Int']>,
  limit?: Types.Maybe<Types.Scalars['Int']>
};


export type FeaturesQuery = (
  { __typename?: 'Query' }
  & { features: (
    { __typename?: 'FeatureCollection' }
    & Pick<Types.FeatureCollection, 'total'>
    & { items: Array<(
      { __typename?: 'Feature' }
      & FeatureFragmentFragment
    )> }
  ) }
);


export const FeaturesDocument = gql`
    query features($offset: Int, $limit: Int) {
  features(offset: $offset, limit: $limit) {
    total
    items {
      ...FeatureFragment
    }
  }
}
    ${FeatureFragmentFragmentDoc}`;
export type FeaturesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FeaturesQuery, FeaturesQueryVariables>, 'query'>;

    export const FeaturesComponent = (props: FeaturesComponentProps) => (
      <ApolloReactComponents.Query<FeaturesQuery, FeaturesQueryVariables> query={FeaturesDocument} {...props} />
    );
    
export type FeaturesProps<TChildProps = {}> = ApolloReactHoc.DataProps<FeaturesQuery, FeaturesQueryVariables> & TChildProps;
export function withFeatures<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FeaturesQuery,
  FeaturesQueryVariables,
  FeaturesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, FeaturesQuery, FeaturesQueryVariables, FeaturesProps<TChildProps>>(FeaturesDocument, {
      alias: 'features',
      ...operationOptions
    });
};

/**
 * __useFeaturesQuery__
 *
 * To run a query within a React component, call `useFeaturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFeaturesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeaturesQuery, FeaturesQueryVariables>) {
        return ApolloReactHooks.useQuery<FeaturesQuery, FeaturesQueryVariables>(FeaturesDocument, baseOptions);
      }
export function useFeaturesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeaturesQuery, FeaturesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FeaturesQuery, FeaturesQueryVariables>(FeaturesDocument, baseOptions);
        }
export type FeaturesQueryHookResult = ReturnType<typeof useFeaturesQuery>;
export type FeaturesLazyQueryHookResult = ReturnType<typeof useFeaturesLazyQuery>;
export type FeaturesQueryResult = ApolloReactCommon.QueryResult<FeaturesQuery, FeaturesQueryVariables>;