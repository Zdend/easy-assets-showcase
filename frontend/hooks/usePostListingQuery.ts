import { PostField, SortDirection, PostFilter } from '@/generated/types';
import { usePostsQuery } from '@/graphql/queries/posts.generated';

const LatestsPostsCriteria = (filter?: PostFilter, offset?: number, limit?: number) => ({
  offset: offset || 0,
  limit: limit || 5,
  sortBy: PostField.PUBLISHED_AT,
  sortDir: SortDirection.DESC,
  filter: {
    PUBLISHED: true,
    ...filter
  }
});

const usePostListingQuery = (filter: PostFilter, offset?: number, limit?: number) => {
  return usePostsQuery({
    variables: LatestsPostsCriteria(filter, offset, limit)
  });
};

export default usePostListingQuery;
