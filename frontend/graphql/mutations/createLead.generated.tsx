import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CreateLeadMutationVariables = {
  input: Types.CreateLeadInput
};


export type CreateLeadMutation = (
  { __typename?: 'Mutation' }
  & { createLead: Types.Maybe<(
    { __typename?: 'CreateLeadPayload' }
    & { lead: (
      { __typename?: 'Lead' }
      & Pick<Types.Lead, 'id'>
    ) }
  )> }
);


export const CreateLeadDocument = gql`
    mutation createLead($input: CreateLeadInput!) {
  createLead(input: $input) {
    lead {
      id
    }
  }
}
    `;
export type CreateLeadMutationFn = ApolloReactCommon.MutationFunction<CreateLeadMutation, CreateLeadMutationVariables>;
export type CreateLeadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateLeadMutation, CreateLeadMutationVariables>, 'mutation'>;

    export const CreateLeadComponent = (props: CreateLeadComponentProps) => (
      <ApolloReactComponents.Mutation<CreateLeadMutation, CreateLeadMutationVariables> mutation={CreateLeadDocument} {...props} />
    );
    
export type CreateLeadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateLeadMutation, CreateLeadMutationVariables> & TChildProps;
export function withCreateLead<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateLeadMutation,
  CreateLeadMutationVariables,
  CreateLeadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateLeadMutation, CreateLeadMutationVariables, CreateLeadProps<TChildProps>>(CreateLeadDocument, {
      alias: 'createLead',
      ...operationOptions
    });
};

/**
 * __useCreateLeadMutation__
 *
 * To run a mutation, you first call `useCreateLeadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLeadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLeadMutation, { data, loading, error }] = useCreateLeadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLeadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLeadMutation, CreateLeadMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateLeadMutation, CreateLeadMutationVariables>(CreateLeadDocument, baseOptions);
      }
export type CreateLeadMutationHookResult = ReturnType<typeof useCreateLeadMutation>;
export type CreateLeadMutationResult = ApolloReactCommon.MutationResult<CreateLeadMutation>;
export type CreateLeadMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateLeadMutation, CreateLeadMutationVariables>;