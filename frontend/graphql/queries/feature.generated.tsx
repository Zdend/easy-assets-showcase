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


export type FeatureQueryVariables = {
  id: Types.Scalars['ID']
};


export type FeatureQuery = (
  { __typename?: 'Query' }
  & { feature: (
    { __typename?: 'Feature' }
    & FeatureFragmentFragment
  ) }
);


export const FeatureDocument = gql`
    query feature($id: ID!) {
  feature(id: $id) {
    ...FeatureFragment
  }
}
    ${FeatureFragmentFragmentDoc}`;
export type FeatureComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FeatureQuery, FeatureQueryVariables>, 'query'> & ({ variables: FeatureQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const FeatureComponent = (props: FeatureComponentProps) => (
      <ApolloReactComponents.Query<FeatureQuery, FeatureQueryVariables> query={FeatureDocument} {...props} />
    );
    
export type FeatureProps<TChildProps = {}> = ApolloReactHoc.DataProps<FeatureQuery, FeatureQueryVariables> & TChildProps;
export function withFeature<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FeatureQuery,
  FeatureQueryVariables,
  FeatureProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, FeatureQuery, FeatureQueryVariables, FeatureProps<TChildProps>>(FeatureDocument, {
      alias: 'feature',
      ...operationOptions
    });
};

/**
 * __useFeatureQuery__
 *
 * To run a query within a React component, call `useFeatureQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeatureQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeatureQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFeatureQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeatureQuery, FeatureQueryVariables>) {
        return ApolloReactHooks.useQuery<FeatureQuery, FeatureQueryVariables>(FeatureDocument, baseOptions);
      }
export function useFeatureLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeatureQuery, FeatureQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FeatureQuery, FeatureQueryVariables>(FeatureDocument, baseOptions);
        }
export type FeatureQueryHookResult = ReturnType<typeof useFeatureQuery>;
export type FeatureLazyQueryHookResult = ReturnType<typeof useFeatureLazyQuery>;
export type FeatureQueryResult = ApolloReactCommon.QueryResult<FeatureQuery, FeatureQueryVariables>;