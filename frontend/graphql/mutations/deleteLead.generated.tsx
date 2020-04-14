import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type DeleteLeadMutationVariables = {
  id: Types.Scalars['ID']
};


export type DeleteLeadMutation = (
  { __typename?: 'Mutation' }
  & { deleteLead: Types.Maybe<(
    { __typename?: 'SimpleResponsePayload' }
    & Pick<Types.SimpleResponsePayload, 'ok'>
  )> }
);


export const DeleteLeadDocument = gql`
    mutation deleteLead($id: ID!) {
  deleteLead(id: $id) {
    ok
  }
}
    `;
export type DeleteLeadMutationFn = ApolloReactCommon.MutationFunction<DeleteLeadMutation, DeleteLeadMutationVariables>;
export type DeleteLeadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteLeadMutation, DeleteLeadMutationVariables>, 'mutation'>;

    export const DeleteLeadComponent = (props: DeleteLeadComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteLeadMutation, DeleteLeadMutationVariables> mutation={DeleteLeadDocument} {...props} />
    );
    
export type DeleteLeadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteLeadMutation, DeleteLeadMutationVariables> & TChildProps;
export function withDeleteLead<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteLeadMutation,
  DeleteLeadMutationVariables,
  DeleteLeadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteLeadMutation, DeleteLeadMutationVariables, DeleteLeadProps<TChildProps>>(DeleteLeadDocument, {
      alias: 'deleteLead',
      ...operationOptions
    });
};

/**
 * __useDeleteLeadMutation__
 *
 * To run a mutation, you first call `useDeleteLeadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLeadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLeadMutation, { data, loading, error }] = useDeleteLeadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLeadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteLeadMutation, DeleteLeadMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteLeadMutation, DeleteLeadMutationVariables>(DeleteLeadDocument, baseOptions);
      }
export type DeleteLeadMutationHookResult = ReturnType<typeof useDeleteLeadMutation>;
export type DeleteLeadMutationResult = ApolloReactCommon.MutationResult<DeleteLeadMutation>;
export type DeleteLeadMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteLeadMutation, DeleteLeadMutationVariables>;