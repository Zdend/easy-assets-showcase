import React from 'react';
import { Table, Empty } from 'antd';
import withNoSSR from '../hoc/withNoSSR';
import DeleteEntityButton from '../components/DeleteEntityButton';
import { useDeleteUserMutation } from '@/graphql/mutations/deleteUser.generated';
import { useUsersQuery } from '@/graphql/queries/users.generated';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Action',
    key: 'action',
    width: '110px',
    render: (_, record) => {
      return (
        <DeleteEntityButton
          id={record.id}
          entityName="User"
          refetchQueries={['users']}
          useDeleteMutationHook={useDeleteUserMutation}
          disabled={record.role === 'SUPER_ADMIN'}
        />
      );
    }
  }
];

function UsersList() {
  const { loading, data } = useUsersQuery();

  if (loading || data?.users) {
    return (
      <Table
        scroll={{ x: true }}
        rowKey="id"
        tableLayout="auto"
        bordered
        columns={columns}
        dataSource={data?.users}
        loading={loading}
      />
    );
  }

  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="You have no users yet." />;
}

export default withNoSSR(UsersList);
