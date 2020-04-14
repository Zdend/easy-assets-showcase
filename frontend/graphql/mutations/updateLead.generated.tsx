import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UpdateLeadMutationVariables = {
  input: Types.UpdateLeadInput
};


export type UpdateLeadMutation = (
  { __typename?: 'Mutation' }
  & { updateLead: Types.Maybe<(
    { __typename?: 'UpdateLeadPayload' }
    & { lead: (
      { __typename?: 'Lead' }
      & Pick<Types.Lead, 'id'>
    ) }
  )> }
);


export const UpdateLeadDocument = gql`
    mutation updateLead($input: UpdateLeadInput!) {
  updateLead(input: $input) {
    lead {
      id
    }
  }
}
    `;
export type UpdateLeadMutationFn = ApolloReactCommon.MutationFunction<UpdateLeadMutation, UpdateLeadMutationVariables>;
export type UpdateLeadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateLeadMutation, UpdateLeadMutationVariables>, 'mutation'>;

    export const UpdateLeadComponent = (props: UpdateLeadComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateLeadMutation, UpdateLeadMutationVariables> mutation={UpdateLeadDocument} {...props} />
    );
    
export type UpdateLeadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateLeadMutation, UpdateLeadMutationVariables> & TChildProps;
export function withUpdateLead<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateLeadMutation,
  UpdateLeadMutationVariables,
  UpdateLeadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateLeadMutation, UpdateLeadMutationVariables, UpdateLeadProps<TChildProps>>(UpdateLeadDocument, {
      alias: 'updateLead',
      ...operationOptions
    });
};

/**
 * __useUpdateLeadMutation__
 *
 * To run a mutation, you first call `useUpdateLeadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLeadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLeadMutation, { data, loading, error }] = useUpdateLeadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLeadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLeadMutation, UpdateLeadMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateLeadMutation, UpdateLeadMutationVariables>(UpdateLeadDocument, baseOptions);
      }
export type UpdateLeadMutationHookResult = ReturnType<typeof useUpdateLeadMutation>;
export type UpdateLeadMutationResult = ApolloReactCommon.MutationResult<UpdateLeadMutation>;
export type UpdateLeadMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLeadMutation, UpdateLeadMutationVariables>;