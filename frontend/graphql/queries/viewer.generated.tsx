import * as Types from '../../generated/types';

import { ViewerFragmentFragment } from '../fragments/viewer.generated';
import gql from 'graphql-tag';
import { ViewerFragmentFragmentDoc } from '../fragments/viewer.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type ViewerQueryVariables = {};


export type ViewerQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'Viewer' }
    & ViewerFragmentFragment
  ) }
);


export const ViewerDocument = gql`
    query viewer {
  viewer {
    ...ViewerFragment
  }
}
    ${ViewerFragmentFragmentDoc}`;
export type ViewerComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ViewerQuery, ViewerQueryVariables>, 'query'>;

    export const ViewerComponent = (props: ViewerComponentProps) => (
      <ApolloReactComponents.Query<ViewerQuery, ViewerQueryVariables> query={ViewerDocument} {...props} />
    );
    
export type ViewerProps<TChildProps = {}> = ApolloReactHoc.DataProps<ViewerQuery, ViewerQueryVariables> & TChildProps;
export function withViewer<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ViewerQuery,
  ViewerQueryVariables,
  ViewerProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, ViewerQuery, ViewerQueryVariables, ViewerProps<TChildProps>>(ViewerDocument, {
      alias: 'viewer',
      ...operationOptions
    });
};

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
        return ApolloReactHooks.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, baseOptions);
      }
export function useViewerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, baseOptions);
        }
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = ApolloReactCommon.QueryResult<ViewerQuery, ViewerQueryVariables>;