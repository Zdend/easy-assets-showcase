import React from 'react';
import { Result, Button } from 'antd';
import PublicLayout from '@/components/Layout/PublicLayout';

const Error404 = () => (
  <Result
    status="error"
    title="Whoops that page is gone."
    subTitle="The link you followed may be broken or the page may have been removed."
    extra={
      <Button type="primary" href="/">
        Back Home
      </Button>
    }
  />
);

const ErrorOther = ({ statusCode }) => (
  <Result
    status={statusCode}
    title={statusCode}
    subTitle="Something went wrong."
    extra={
      <Button type="primary" href="/">
        Back Home
      </Button>
    }
  />
);

const getErrorComponent = (statusCode: number) => {
  switch (statusCode) {
    case 404:
      return Error404;
    default:
      return ErrorOther;
  }
};

function Error({ statusCode }) {
  const ErrorComponent = getErrorComponent(statusCode);
  return (
    <PublicLayout meta={{ title: `${statusCode} | Something went wrong` }}>
      <ErrorComponent statusCode={statusCode} />
    </PublicLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const responseStatusCode = res ? res.statusCode : null;
  const statusCode = !responseStatusCode && err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
