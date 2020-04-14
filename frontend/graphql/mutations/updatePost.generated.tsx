import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UpdatePostMutationVariables = {
  input: Types.UpdatePostInput
};


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: Types.Maybe<(
    { __typename?: 'Post' }
    & Pick<Types.Post, 'id'>
  )> }
);


export const UpdatePostDocument = gql`
    mutation updatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
  }
}
    `;
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;
export type UpdatePostComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePostMutation, UpdatePostMutationVariables>, 'mutation'>;

    export const UpdatePostComponent = (props: UpdatePostComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePostMutation, UpdatePostMutationVariables> mutation={UpdatePostDocument} {...props} />
    );
    
export type UpdatePostProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdatePostMutation, UpdatePostMutationVariables> & TChildProps;
export function withUpdatePost<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdatePostMutation,
  UpdatePostMutationVariables,
  UpdatePostProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdatePostMutation, UpdatePostMutationVariables, UpdatePostProps<TChildProps>>(UpdatePostDocument, {
      alias: 'updatePost',
      ...operationOptions
    });
};

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = ApolloReactCommon.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;