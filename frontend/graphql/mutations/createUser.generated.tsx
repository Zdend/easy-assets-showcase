import * as Types from '../../generated/types';

import { UserFragmentFragment } from '../fragments/user.generated';
import gql from 'graphql-tag';
import { UserFragmentFragmentDoc } from '../fragments/user.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type CreateUserMutationVariables = {
  input: Types.CreateUserInput
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: Types.Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);


export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>, 'mutation'>;

    export const CreateUserComponent = (props: CreateUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables> mutation={CreateUserDocument} {...props} />
    );
    
export type CreateUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateUserMutation, CreateUserMutationVariables> & TChildProps;
export function withCreateUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;