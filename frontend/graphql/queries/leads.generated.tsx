import * as Types from '../../generated/types';

import { CompanyFragmentFragment } from '../fragments/company.generated';
import { LeadFragmentFragment } from '../fragments/lead.generated';
import gql from 'graphql-tag';
import { LeadFragmentFragmentDoc } from '../fragments/lead.generated';
import { CompanyFragmentFragmentDoc } from '../fragments/company.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;



export type LeadsQueryVariables = {
  offset?: Types.Maybe<Types.Scalars['Int']>,
  limit?: Types.Maybe<Types.Scalars['Int']>
};


export type LeadsQuery = (
  { __typename?: 'Query' }
  & { leads: (
    { __typename?: 'LeadCollection' }
    & Pick<Types.LeadCollection, 'total'>
    & { items: Array<(
      { __typename?: 'Lead' }
      & { companies: Array<(
        { __typename?: 'Company' }
        & CompanyFragmentFragment
      )> }
      & LeadFragmentFragment
    )> }
  ) }
);


export const LeadsDocument = gql`
    query leads($offset: Int, $limit: Int) {
  leads(offset: $offset, limit: $limit) {
    total
    items {
      ...LeadFragment
      companies {
        ...CompanyFragment
      }
    }
  }
}
    ${LeadFragmentFragmentDoc}
${CompanyFragmentFragmentDoc}`;
export type LeadsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<LeadsQuery, LeadsQueryVariables>, 'query'>;

    export const LeadsComponent = (props: LeadsComponentProps) => (
      <ApolloReactComponents.Query<LeadsQuery, LeadsQueryVariables> query={LeadsDocument} {...props} />
    );
    
export type LeadsProps<TChildProps = {}> = ApolloReactHoc.DataProps<LeadsQuery, LeadsQueryVariables> & TChildProps;
export function withLeads<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LeadsQuery,
  LeadsQueryVariables,
  LeadsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, LeadsQuery, LeadsQueryVariables, LeadsProps<TChildProps>>(LeadsDocument, {
      alias: 'leads',
      ...operationOptions
    });
};

/**
 * __useLeadsQuery__
 *
 * To run a query within a React component, call `useLeadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeadsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeadsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useLeadsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LeadsQuery, LeadsQueryVariables>) {
        return ApolloReactHooks.useQuery<LeadsQuery, LeadsQueryVariables>(LeadsDocument, baseOptions);
      }
export function useLeadsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LeadsQuery, LeadsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LeadsQuery, LeadsQueryVariables>(LeadsDocument, baseOptions);
        }
export type LeadsQueryHookResult = ReturnType<typeof useLeadsQuery>;
export type LeadsLazyQueryHookResult = ReturnType<typeof useLeadsLazyQuery>;
export type LeadsQueryResult = ApolloReactCommon.QueryResult<LeadsQuery, LeadsQueryVariables>;