import * as Types from '../../generated/types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UploadImageMutationVariables = {
  image: Types.Scalars['Upload'],
  folder: Types.UploadFolder
};


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { uploadImage: (
    { __typename?: 'File' }
    & Pick<Types.File, 'url'>
  ) }
);


export const UploadImageDocument = gql`
    mutation uploadImage($image: Upload!, $folder: UploadFolder!) {
  uploadImage(image: $image, folder: $folder) {
    url
  }
}
    `;
export type UploadImageMutationFn = ApolloReactCommon.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;
export type UploadImageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UploadImageMutation, UploadImageMutationVariables>, 'mutation'>;

    export const UploadImageComponent = (props: UploadImageComponentProps) => (
      <ApolloReactComponents.Mutation<UploadImageMutation, UploadImageMutationVariables> mutation={UploadImageDocument} {...props} />
    );
    
export type UploadImageProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UploadImageMutation, UploadImageMutationVariables> & TChildProps;
export function withUploadImage<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UploadImageMutation,
  UploadImageMutationVariables,
  UploadImageProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UploadImageMutation, UploadImageMutationVariables, UploadImageProps<TChildProps>>(UploadImageDocument, {
      alias: 'uploadImage',
      ...operationOptions
    });
};

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *      folder: // value for 'folder'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, baseOptions);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = ApolloReactCommon.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;