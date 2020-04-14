import * as Types from '../../generated/types';

import gql from 'graphql-tag';

export type PostFragmentFragment = (
  { __typename?: 'Post' }
  & Pick<Types.Post, 'id' | 'title' | 'content' | 'createdAt' | 'published' | 'mainImage' | 'slug' | 'publishedAt'>
);

export const PostFragmentFragmentDoc = gql`
    fragment PostFragment on Post {
  id
  title
  content
  createdAt
  published
  mainImage
  slug
  publishedAt
}
    `;