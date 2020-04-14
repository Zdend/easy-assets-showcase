import * as Types from '../../generated/types';

import { PostFragmentFragment } from '../fragments/post.generated';
import gql from 'graphql-tag';
import { PostFragmentFragmentDoc } from '../fragments/post.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type PostQueryVariables = {
  id: Types.Scalars['ID']
};


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & { features: Array<(
      { __typename?: 'Feature' }
      & Pick<Types.Feature, 'id'>
    )> }
    & PostFragmentFragment
  ) }
);


export const PostDocument = gql`
    query post($id: ID!) {
  post(id: $id) {
    ...PostFragment
    features {
      id
    }
  }
}
    ${PostFragmentFragmentDoc}`;
export type PostComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PostQuery, PostQueryVariables>, 'query'> & ({ variables: PostQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PostComponent = (props: PostComponentProps) => (
      <ApolloReactComponents.Query<PostQuery, PostQueryVariables> query={PostDocument} {...props} />
    );
    
export type PostProps<TChildProps = {}> = ApolloReactHoc.DataProps<PostQuery, PostQueryVariables> & TChildProps;
export function withPost<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PostQuery,
  PostQueryVariables,
  PostProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, PostQuery, PostQueryVariables, PostProps<TChildProps>>(PostDocument, {
      alias: 'post',
      ...operationOptions
    });
};

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;