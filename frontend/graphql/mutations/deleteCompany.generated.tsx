import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type DeleteCompanyMutationVariables = {
  id: Types.Scalars['ID']
};


export type DeleteCompanyMutation = (
  { __typename?: 'Mutation' }
  & { deleteCompany: Types.Maybe<(
    { __typename?: 'SimpleResponsePayload' }
    & Pick<Types.SimpleResponsePayload, 'ok'>
  )> }
);


export const DeleteCompanyDocument = gql`
    mutation deleteCompany($id: ID!) {
  deleteCompany(id: $id) {
    ok
  }
}
    `;
export type DeleteCompanyMutationFn = ApolloReactCommon.MutationFunction<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export type DeleteCompanyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>, 'mutation'>;

    export const DeleteCompanyComponent = (props: DeleteCompanyComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteCompanyMutation, DeleteCompanyMutationVariables> mutation={DeleteCompanyDocument} {...props} />
    );
    
export type DeleteCompanyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteCompanyMutation, DeleteCompanyMutationVariables> & TChildProps;
export function withDeleteCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteCompanyMutation,
  DeleteCompanyMutationVariables,
  DeleteCompanyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteCompanyMutation, DeleteCompanyMutationVariables, DeleteCompanyProps<TChildProps>>(DeleteCompanyDocument, {
      alias: 'deleteCompany',
      ...operationOptions
    });
};

/**
 * __useDeleteCompanyMutation__
 *
 * To run a mutation, you first call `useDeleteCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompanyMutation, { data, loading, error }] = useDeleteCompanyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCompanyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCompanyMutation, DeleteCompanyMutationVariables>(DeleteCompanyDocument, baseOptions);
      }
export type DeleteCompanyMutationHookResult = ReturnType<typeof useDeleteCompanyMutation>;
export type DeleteCompanyMutationResult = ApolloReactCommon.MutationResult<DeleteCompanyMutation>;
export type DeleteCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>;