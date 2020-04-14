import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CreatePostMutationVariables = {
  input: Types.CreatePostInput
};


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: Types.Maybe<(
    { __typename?: 'Post' }
    & Pick<Types.Post, 'id'>
  )> }
);


export const CreatePostDocument = gql`
    mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;
export type CreatePostComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreatePostMutation, CreatePostMutationVariables>, 'mutation'>;

    export const CreatePostComponent = (props: CreatePostComponentProps) => (
      <ApolloReactComponents.Mutation<CreatePostMutation, CreatePostMutationVariables> mutation={CreatePostDocument} {...props} />
    );
    
export type CreatePostProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreatePostMutation, CreatePostMutationVariables> & TChildProps;
export function withCreatePost<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreatePostMutation,
  CreatePostMutationVariables,
  CreatePostProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreatePostMutation, CreatePostMutationVariables, CreatePostProps<TChildProps>>(CreatePostDocument, {
      alias: 'createPost',
      ...operationOptions
    });
};

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;