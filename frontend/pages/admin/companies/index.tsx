import * as React from 'react';
import { Row, Col, Typography, Button, Input } from 'antd';
import Link from 'next/link';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import AdminCompanyList from '@/smart/AdminCompanyList';

const { Search } = Input;

const CompaniesPage = () => {
  const [search, setSearch] = React.useState(null);
  return (
    <PrivateLayout title="Companies">
      <Typography.Title level={1}>Manage Companies</Typography.Title>
      <Row>
        <Col xs={24} className="justify-between flex flex-wrap">
          <Link href="/admin/companies/new">
            <Button type="primary" className="mb-4">
              <a>New company</a>
            </Button>
          </Link>
          <div className="mb-4">
            <Search
              placeholder="Search.."
              onSearch={value => setSearch(value)}
              style={{ width: 200 }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AdminCompanyList searchExpression={search} />
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default withAuth(CompaniesPage);
