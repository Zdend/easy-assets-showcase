import React from 'react';
import { Table, Empty } from 'antd';
import Link from 'next/link';
import capitalize from 'lodash.capitalize';
import uniq from 'ramda/src/uniq';
import { CompanyField } from '@/generated/types';
import { formatFixedDate } from '@/utils/date';
import usePagination from '@/hooks/usePagination';
import DeleteEntityButton from '@/components/DeleteEntityButton';
import { useDeleteCompanyMutation } from '@/graphql/mutations/deleteCompany.generated';
import { useAdminCompanyListQuery } from './AdminCompanyListQuery.generated';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    key: CompanyField.NAME,
    render: (text, record) => (
      <Link href="/admin/companies/[id]" as={`/admin/companies/${record.id}`}>
        <a>{text}</a>
      </Link>
    )
  },
  {
    title: 'Cities',
    render: (_text, record) =>
      uniq((record.addresses || []).map(address => capitalize(address.city))).join(', '),
    sorter: false,
    key: CompanyField.ADDRESS_CITY
  },
  {
    title: 'Audience Type',
    render: (_text, record) => record.type,
    sorter: true,
    key: CompanyField.TYPE
  },
  {
    title: 'Service Type',
    render: (_text, record) => record.serviceType,
    sorter: true,
    key: CompanyField.SERVICE_TYPE
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    sorter: true,
    key: CompanyField.CREATED_AT,
    render: createdAt => {
      return formatFixedDate(createdAt);
    }
  },
  {
    title: 'Action',
    key: 'action',
    width: '110px',
    render: (_, record) => {
      return (
        <DeleteEntityButton
          id={record.id}
          entityName="Company"
          refetchQueries={['adminCompanyList']}
          useDeleteMutationHook={useDeleteCompanyMutation}
        />
      );
    }
  }
];

interface Props {
  searchExpression: string | null;
}

function CompanyList({ searchExpression }: Props) {
  const { handleTableChange, pagination } = usePagination({
    defaultSortBy: CompanyField.CREATED_AT
  });
  const { loading, data } = useAdminCompanyListQuery({
    variables: {
      ...pagination,
      filter: {
        SEARCH: searchExpression
      }
    }
  });
  const { items, total } = data?.companies ?? {};

  const hasData = total > 0 && items;

  if (loading || hasData) {
    return (
      <Table
        scroll={{ x: true }}
        tableLayout="auto"
        rowKey="id"
        bordered
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination={{
          defaultPageSize: pagination.limit,
          total,
          showTotal: tableTotal => `Total rows: ${tableTotal}`
        }}
        onChange={handleTableChange}
      />
    );
  }

  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no companies yet.">
      <Link href="/admin/companies/new">
        <a>Create a new company</a>
      </Link>
    </Empty>
  );
}

export default CompanyList;
