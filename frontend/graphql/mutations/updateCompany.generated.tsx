import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UpdateCompanyMutationVariables = {
  input: Types.UpdateCompanyInput
};


export type UpdateCompanyMutation = (
  { __typename?: 'Mutation' }
  & { updateCompany: Types.Maybe<(
    { __typename?: 'Company' }
    & Pick<Types.Company, 'id'>
  )> }
);


export const UpdateCompanyDocument = gql`
    mutation updateCompany($input: UpdateCompanyInput!) {
  updateCompany(input: $input) {
    id
  }
}
    `;
export type UpdateCompanyMutationFn = ApolloReactCommon.MutationFunction<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export type UpdateCompanyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>, 'mutation'>;

    export const UpdateCompanyComponent = (props: UpdateCompanyComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateCompanyMutation, UpdateCompanyMutationVariables> mutation={UpdateCompanyDocument} {...props} />
    );
    
export type UpdateCompanyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateCompanyMutation, UpdateCompanyMutationVariables> & TChildProps;
export function withUpdateCompany<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables,
  UpdateCompanyProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateCompanyMutation, UpdateCompanyMutationVariables, UpdateCompanyProps<TChildProps>>(UpdateCompanyDocument, {
      alias: 'updateCompany',
      ...operationOptions
    });
};

/**
 * __useUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMutation, { data, loading, error }] = useUpdateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument, baseOptions);
      }
export type UpdateCompanyMutationHookResult = ReturnType<typeof useUpdateCompanyMutation>;
export type UpdateCompanyMutationResult = ApolloReactCommon.MutationResult<UpdateCompanyMutation>;
export type UpdateCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>;