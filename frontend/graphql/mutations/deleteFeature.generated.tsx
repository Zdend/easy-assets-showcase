import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type DeleteFeatureMutationVariables = {
  id: Types.Scalars['ID']
};


export type DeleteFeatureMutation = (
  { __typename?: 'Mutation' }
  & { deleteFeature: Types.Maybe<(
    { __typename?: 'SimpleResponsePayload' }
    & Pick<Types.SimpleResponsePayload, 'ok'>
  )> }
);


export const DeleteFeatureDocument = gql`
    mutation deleteFeature($id: ID!) {
  deleteFeature(id: $id) {
    ok
  }
}
    `;
export type DeleteFeatureMutationFn = ApolloReactCommon.MutationFunction<DeleteFeatureMutation, DeleteFeatureMutationVariables>;
export type DeleteFeatureComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteFeatureMutation, DeleteFeatureMutationVariables>, 'mutation'>;

    export const DeleteFeatureComponent = (props: DeleteFeatureComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteFeatureMutation, DeleteFeatureMutationVariables> mutation={DeleteFeatureDocument} {...props} />
    );
    
export type DeleteFeatureProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteFeatureMutation, DeleteFeatureMutationVariables> & TChildProps;
export function withDeleteFeature<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteFeatureMutation,
  DeleteFeatureMutationVariables,
  DeleteFeatureProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteFeatureMutation, DeleteFeatureMutationVariables, DeleteFeatureProps<TChildProps>>(DeleteFeatureDocument, {
      alias: 'deleteFeature',
      ...operationOptions
    });
};

/**
 * __useDeleteFeatureMutation__
 *
 * To run a mutation, you first call `useDeleteFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFeatureMutation, { data, loading, error }] = useDeleteFeatureMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFeatureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteFeatureMutation, DeleteFeatureMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteFeatureMutation, DeleteFeatureMutationVariables>(DeleteFeatureDocument, baseOptions);
      }
export type DeleteFeatureMutationHookResult = ReturnType<typeof useDeleteFeatureMutation>;
export type DeleteFeatureMutationResult = ApolloReactCommon.MutationResult<DeleteFeatureMutation>;
export type DeleteFeatureMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteFeatureMutation, DeleteFeatureMutationVariables>;