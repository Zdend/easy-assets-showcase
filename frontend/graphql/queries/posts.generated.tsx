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


export type PostsQueryVariables = {
  offset?: Types.Maybe<Types.Scalars['Int']>,
  limit?: Types.Maybe<Types.Scalars['Int']>,
  sortBy?: Types.Maybe<Types.PostField>,
  sortDir?: Types.Maybe<Types.SortDirection>,
  filter?: Types.Maybe<Types.PostFilter>
};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostCollection' }
    & Pick<Types.PostCollection, 'total'>
    & { items: Array<(
      { __typename?: 'Post' }
      & { author: (
        { __typename?: 'User' }
        & Pick<Types.User, 'name'>
      ) }
      & PostFragmentFragment
    )> }
  ) }
);


export const PostsDocument = gql`
    query posts($offset: Int, $limit: Int, $sortBy: PostField, $sortDir: SortDirection, $filter: PostFilter) {
  posts(offset: $offset, limit: $limit, sortBy: $sortBy, sortDir: $sortDir, filter: $filter) {
    total
    items {
      ...PostFragment
      author {
        name
      }
    }
  }
}
    ${PostFragmentFragmentDoc}`;
export type PostsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PostsQuery, PostsQueryVariables>, 'query'>;

    export const PostsComponent = (props: PostsComponentProps) => (
      <ApolloReactComponents.Query<PostsQuery, PostsQueryVariables> query={PostsDocument} {...props} />
    );
    
export type PostsProps<TChildProps = {}> = ApolloReactHoc.DataProps<PostsQuery, PostsQueryVariables> & TChildProps;
export function withPosts<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PostsQuery,
  PostsQueryVariables,
  PostsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, PostsQuery, PostsQueryVariables, PostsProps<TChildProps>>(PostsDocument, {
      alias: 'posts',
      ...operationOptions
    });
};

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sortBy: // value for 'sortBy'
 *      sortDir: // value for 'sortDir'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;