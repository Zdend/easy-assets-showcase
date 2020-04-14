import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UpdateFeatureMutationVariables = {
  input: Types.UpdateFeatureInput
};


export type UpdateFeatureMutation = (
  { __typename?: 'Mutation' }
  & { updateFeature: Types.Maybe<(
    { __typename?: 'Feature' }
    & Pick<Types.Feature, 'id'>
  )> }
);


export const UpdateFeatureDocument = gql`
    mutation updateFeature($input: UpdateFeatureInput!) {
  updateFeature(input: $input) {
    id
  }
}
    `;
export type UpdateFeatureMutationFn = ApolloReactCommon.MutationFunction<UpdateFeatureMutation, UpdateFeatureMutationVariables>;
export type UpdateFeatureComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateFeatureMutation, UpdateFeatureMutationVariables>, 'mutation'>;

    export const UpdateFeatureComponent = (props: UpdateFeatureComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateFeatureMutation, UpdateFeatureMutationVariables> mutation={UpdateFeatureDocument} {...props} />
    );
    
export type UpdateFeatureProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateFeatureMutation, UpdateFeatureMutationVariables> & TChildProps;
export function withUpdateFeature<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateFeatureMutation,
  UpdateFeatureMutationVariables,
  UpdateFeatureProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateFeatureMutation, UpdateFeatureMutationVariables, UpdateFeatureProps<TChildProps>>(UpdateFeatureDocument, {
      alias: 'updateFeature',
      ...operationOptions
    });
};

/**
 * __useUpdateFeatureMutation__
 *
 * To run a mutation, you first call `useUpdateFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeatureMutation, { data, loading, error }] = useUpdateFeatureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFeatureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateFeatureMutation, UpdateFeatureMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateFeatureMutation, UpdateFeatureMutationVariables>(UpdateFeatureDocument, baseOptions);
      }
export type UpdateFeatureMutationHookResult = ReturnType<typeof useUpdateFeatureMutation>;
export type UpdateFeatureMutationResult = ApolloReactCommon.MutationResult<UpdateFeatureMutation>;
export type UpdateFeatureMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateFeatureMutation, UpdateFeatureMutationVariables>;