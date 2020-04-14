import { CompanyField, SortDirection, CompanyFilter, CompanyStatus } from '@/generated/types';
import {
  useCompaniesQuery,
  CompaniesQueryResult,
  CompaniesQueryVariables
} from '@/graphql/queries/companies.generated';
import { useCallback } from 'react';

export const CompanyCriteria = (
  filterOptions?: CompanyFilter,
  offset?: number,
  limit?: number,
  sortBy?: CompanyField,
): CompaniesQueryVariables => ({
  limit: limit || 10,
  offset: offset || 0,
  sortBy: sortBy || CompanyField.PREMIUM,
  sortDir: SortDirection.DESC,
  filter: {
    STATUS: { in: [CompanyStatus.ACTIVE] },
    ...filterOptions
  }
});

export const useFetchMoreFn = (fetchMore: CompaniesQueryResult['fetchMore'], filter: CompanyFilter, offset: number, limit: number, sortBy?: CompanyField) => {
  return useCallback(() => {
    fetchMore({
      variables: CompanyCriteria(filter, offset, limit, sortBy),
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          companies: {
            ...prev.companies,
            items: [...prev.companies.items, ...fetchMoreResult.companies.items]
          }
        };
      }
    });
  }, [offset]);
}

export default function useCompanyListingQuery(
  filter: CompanyFilter,
  offset?: number,
  limit?: number,
  sortBy?: CompanyField,
): CompaniesQueryResult & { fetchMoreFn: Function } {
  const { fetchMore, data, ...rest } = useCompaniesQuery({
    variables: CompanyCriteria(filter, offset, limit, sortBy),
    notifyOnNetworkStatusChange: true
  });

  const fetchMoreFn = useFetchMoreFn(fetchMore, filter, data?.companies?.items?.length, limit, sortBy);

  return {
    ...rest,
    fetchMore,
    data,
    fetchMoreFn,
  }
}
