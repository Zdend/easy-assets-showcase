import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CreateFeatureMutationVariables = {
  input: Types.CreateFeatureInput
};


export type CreateFeatureMutation = (
  { __typename?: 'Mutation' }
  & { createFeature: Types.Maybe<(
    { __typename?: 'Feature' }
    & Pick<Types.Feature, 'id'>
  )> }
);


export const CreateFeatureDocument = gql`
    mutation createFeature($input: CreateFeatureInput!) {
  createFeature(input: $input) {
    id
  }
}
    `;
export type CreateFeatureMutationFn = ApolloReactCommon.MutationFunction<CreateFeatureMutation, CreateFeatureMutationVariables>;
export type CreateFeatureComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateFeatureMutation, CreateFeatureMutationVariables>, 'mutation'>;

    export const CreateFeatureComponent = (props: CreateFeatureComponentProps) => (
      <ApolloReactComponents.Mutation<CreateFeatureMutation, CreateFeatureMutationVariables> mutation={CreateFeatureDocument} {...props} />
    );
    
export type CreateFeatureProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateFeatureMutation, CreateFeatureMutationVariables> & TChildProps;
export function withCreateFeature<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateFeatureMutation,
  CreateFeatureMutationVariables,
  CreateFeatureProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateFeatureMutation, CreateFeatureMutationVariables, CreateFeatureProps<TChildProps>>(CreateFeatureDocument, {
      alias: 'createFeature',
      ...operationOptions
    });
};

/**
 * __useCreateFeatureMutation__
 *
 * To run a mutation, you first call `useCreateFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeatureMutation, { data, loading, error }] = useCreateFeatureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFeatureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFeatureMutation, CreateFeatureMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateFeatureMutation, CreateFeatureMutationVariables>(CreateFeatureDocument, baseOptions);
      }
export type CreateFeatureMutationHookResult = ReturnType<typeof useCreateFeatureMutation>;
export type CreateFeatureMutationResult = ApolloReactCommon.MutationResult<CreateFeatureMutation>;
export type CreateFeatureMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateFeatureMutation, CreateFeatureMutationVariables>;