import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ForgotPasswordMutationVariables = {
  email: Types.Scalars['String']
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: Types.Maybe<(
    { __typename?: 'SimpleResponsePayload' }
    & Pick<Types.SimpleResponsePayload, 'ok'>
  )> }
);


export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
  }
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export type ForgotPasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>, 'mutation'>;

    export const ForgotPasswordComponent = (props: ForgotPasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> mutation={ForgotPasswordDocument} {...props} />
    );
    
export type ForgotPasswordProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ForgotPasswordMutation, ForgotPasswordMutationVariables> & TChildProps;
export function withForgotPassword<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  ForgotPasswordProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ForgotPasswordMutation, ForgotPasswordMutationVariables, ForgotPasswordProps<TChildProps>>(ForgotPasswordDocument, {
      alias: 'forgotPassword',
      ...operationOptions
    });
};

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;