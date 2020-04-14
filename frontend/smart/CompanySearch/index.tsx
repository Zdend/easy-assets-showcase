import React, { useState } from 'react';
import { Empty, Button, Typography } from 'antd';
import Link from 'next/link';
import CompanyFilterForm from './CompanyFilterForm';
import withCompanyFilterFormik from './withCompanyFilterFormik';
import CompanyListing, { PAGE_SIZE } from '../CompanyListing';
import useCompanyListingQuery from '@/hooks/useCompanyListingQuery';
import { convertValuesToFilter } from './utils';

function CompanySearch({ resetForm, values, handleSubmit }) {
  const [filter, setFilter] = useState(null);
  const result = useCompanyListingQuery(filter, 0, PAGE_SIZE);
  const { loading, data } = result;

  return (
    <div>
      <CompanyFilterForm
        loading={loading}
        values={values}
        handleSubmit={(...args) => {
          setFilter(convertValuesToFilter(values));
          return handleSubmit(...args);
        }}
      />

      <div className="my-10" />
      <CompanyListing
        title={
          <Typography.Title level={2}>
            Found {data?.companies?.total ?? 0} companies
          </Typography.Title>
        }
        filter={filter}
        result={result}
      />

      {!loading && !data?.companies?.items?.length && filter && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              <span>Sorry, we have no results for this query.</span>
              <br />
              <Button
                type="link"
                onClick={() => {
                  resetForm({});
                  setFilter(null);
                }}
                className="p-0"
              >
                Start over
              </Button>
              &nbsp;and change your filter or &nbsp;
              <Link href="/register">
                <a>list your company</a>
              </Link>
              .
            </span>
          }
        />
      )}
    </div>
  );
}

export default withCompanyFilterFormik(CompanySearch) as React.FC<{}>;
