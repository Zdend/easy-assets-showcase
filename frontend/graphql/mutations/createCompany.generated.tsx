import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CreateCompanyMutationVariables = {
  input: Types.CreateCompanyInput
};


export type CreateCompanyMutation = (
  { __typename?: 'Mutation' }
  & { createCompany: Types.Maybe<(
    { __typename?: 'Company' }
    & Pick<Types.Company, 'id'>
  )> }
);


export const CreateCompanyDocument = gql`
    mutation createCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    id
  }
}
    `;
export type CreateCompanyMutationFn = ApolloReactCommon.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;
export type CreateCompanyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateCompanyMutation, CreateCompanyMutationVariables>, 'mutation'>;

    export const CreateCompanyComponent = (props: CreateCompanyComponentProps) => (
      <ApolloReactComponents.Mutation<CreateCompanyMutation, CreateCompanyMutationVariables> mutation={CreateCompanyDocument} {...props} />
    );
    
export type CreateCompanyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateCompanyMutation, CreateCompanyMutationVariables> & TChildProps;
export function withCreateCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateCompanyMutation,
  CreateCompanyMutationVariables,
  CreateCompanyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateCompanyMutation, CreateCompanyMutationVariables, CreateCompanyProps<TChildProps>>(CreateCompanyDocument, {
      alias: 'createCompany',
      ...operationOptions
    });
};

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, baseOptions);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = ApolloReactCommon.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;