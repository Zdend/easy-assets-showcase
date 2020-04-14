import React from 'react';
import { Table, Empty } from 'antd';
import Link from 'next/link';
import withNoSSR from '../hoc/withNoSSR';
import usePagination from '../hooks/usePagination';
import { formatFixedDate } from '@/utils/date';
import DeleteEntityButton from '../components/DeleteEntityButton';
import { PostField } from '@/generated/types';
import { useDeletePostMutation } from '@/graphql/mutations/deletePost.generated';
import { usePostsQuery } from '@/graphql/queries/posts.generated';
import { excerpt } from '@/utils/string';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: true,
    key: PostField.TITLE,
    render: (text, record) => (
      <Link href="/admin/posts/[id]" as={`/admin/posts/${record.id}`}>
        <a>{excerpt(text, 70)}</a>
      </Link>
    )
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    sorter: true,
    key: PostField.CREATED_AT,
    render: createdAt => formatFixedDate(createdAt)
  },
  {
    title: 'Published At',
    dataIndex: 'publishedAt',
    sorter: true,
    key: PostField.PUBLISHED_AT,
    render: createdAt => formatFixedDate(createdAt)
  },
  {
    title: 'Draft',
    dataIndex: 'published',
    key: PostField.PUBLISHED,
    sorter: true,
    render: value => (value ? 'Published' : 'Draft')
  },
  {
    title: 'Action',
    key: 'action',
    width: '110px',
    render: (_, record) => {
      return (
        <DeleteEntityButton
          id={record.id}
          entityName="Post"
          refetchQueries={['posts']}
          useDeleteMutationHook={useDeletePostMutation}
        />
      );
    }
  }
];

function PostList() {
  const { handleTableChange, pagination } = usePagination({ defaultSortBy: PostField.CREATED_AT });
  const { loading, data } = usePostsQuery({
    variables: pagination
  });
  const { items, total } = data?.posts ?? {};

  const hasData = total > 0 && items;

  if (loading || hasData) {
    return (
      <Table
        scroll={{ x: true }}
        bordered
        tableLayout="auto"
        rowKey="id"
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination={{
          defaultPageSize: pagination.limit,
          total
        }}
        onChange={handleTableChange}
      />
    );
  }

  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="You have no posts yet.">
      <Link href="/admin/posts/new">
        <a>Create a new Post</a>
      </Link>
    </Empty>
  );
}

export default withNoSSR(PostList);
