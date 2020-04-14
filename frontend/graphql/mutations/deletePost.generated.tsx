import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type DeletePostMutationVariables = {
  id: Types.Scalars['ID']
};


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: Types.Maybe<(
    { __typename?: 'SimpleResponsePayload' }
    & Pick<Types.SimpleResponsePayload, 'ok'>
  )> }
);


export const DeletePostDocument = gql`
    mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    ok
  }
}
    `;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;
export type DeletePostComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeletePostMutation, DeletePostMutationVariables>, 'mutation'>;

    export const DeletePostComponent = (props: DeletePostComponentProps) => (
      <ApolloReactComponents.Mutation<DeletePostMutation, DeletePostMutationVariables> mutation={DeletePostDocument} {...props} />
    );
    
export type DeletePostProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeletePostMutation, DeletePostMutationVariables> & TChildProps;
export function withDeletePost<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeletePostMutation,
  DeletePostMutationVariables,
  DeletePostProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeletePostMutation, DeletePostMutationVariables, DeletePostProps<TChildProps>>(DeletePostDocument, {
      alias: 'deletePost',
      ...operationOptions
    });
};

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;