import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type DeleteUserMutationVariables = {
  id: Types.Scalars['ID']
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: Types.Maybe<(
    { __typename?: 'SimpleResponsePayload' }
    & Pick<Types.SimpleResponsePayload, 'ok'>
  )> }
);


export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    ok
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;
export type DeleteUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteUserMutation, DeleteUserMutationVariables>, 'mutation'>;

    export const DeleteUserComponent = (props: DeleteUserComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteUserMutation, DeleteUserMutationVariables> mutation={DeleteUserDocument} {...props} />
    );
    
export type DeleteUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteUserMutation, DeleteUserMutationVariables> & TChildProps;
export function withDeleteUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  DeleteUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteUserMutation, DeleteUserMutationVariables, DeleteUserProps<TChildProps>>(DeleteUserDocument, {
      alias: 'deleteUser',
      ...operationOptions
    });
};

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;