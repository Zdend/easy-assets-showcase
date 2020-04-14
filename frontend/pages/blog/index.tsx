import React from 'react';
import { NextPage } from 'next';
import BlogList from '@/smart/BlogList';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';

const BlogIndexPage: NextPage = () => {
  return (
    <PublicSimpleContentLayout
      meta={{
        title: 'How to Build Assets - Easy Assets blog'
      }}
    >
      <BlogList limit={100} />
    </PublicSimpleContentLayout>
  );
};

export default BlogIndexPage;
