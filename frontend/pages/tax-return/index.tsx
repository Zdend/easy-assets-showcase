import React from 'react';
import { NextPage } from 'next';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';
import TaxReturnListing from '@/smart/TaxReturnListing'

const TaxReturnPage: NextPage = () => {
  return (
    <PublicSimpleContentLayout title="Tax Return">
      <TaxReturnListing />
    </PublicSimpleContentLayout>
  );
};

export default TaxReturnPage;
