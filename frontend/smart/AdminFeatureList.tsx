import React from 'react';
import { Table, Empty } from 'antd';
import Link from 'next/link';
import withNoSSR from '../hoc/withNoSSR';
import usePagination from '../hooks/usePagination';
import DeleteEntityButton from '../components/DeleteEntityButton';
import { deleteCache } from '@/utils/apollo';
import { useDeleteFeatureMutation } from '@/graphql/mutations/deleteFeature.generated';
import { useFeaturesQuery } from '@/graphql/queries/features.generated';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, record) => (
      <Link href="/admin/services/[id]" as={`/admin/services/${record.id}`}>
        <a>{text}</a>
      </Link>
    )
  },
  {
    title: 'Action',
    key: 'action',
    width: '110px',
    render: (_, record) => {
      return (
        <DeleteEntityButton
          id={record.id}
          entityName="Feature"
          update={deleteCache(/^Company:/, true)}
          refetchQueries={['features']}
          useDeleteMutationHook={useDeleteFeatureMutation}
        />
      );
    }
  }
];

function FeatureList() {
  const { handleTableChange, pagination } = usePagination({});
  const { loading, data } = useFeaturesQuery({
    variables: pagination
  });
  const { items, total } = data?.features ?? {};

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
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="You have no features yet.">
      <Link href="/admin/services/new">
        <a>Create a new Feature</a>
      </Link>
    </Empty>
  );
}

export default withNoSSR(FeatureList);
