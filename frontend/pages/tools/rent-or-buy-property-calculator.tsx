import React from 'react';
import { NextPage } from 'next';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';
import RentOrBuyCalculator from '@/components/RentOrBuyCalculator';
import { Paragraph } from '@/components/Typography';

const description = `Is buying a property better for our financial freedom or should we rent and invest our money instead to secure early retirement?`

const RentOrBuyCalculatorPage: NextPage = () => {
  return (
    <PublicSimpleContentLayout 
      meta={{ 
        title: 'Is it better to rent or buy a property in Australia?',
        description,
      }}
      title="Rent or Buy a property Calculator">
      <Paragraph size="large">{description}</Paragraph>
      <RentOrBuyCalculator />
    </PublicSimpleContentLayout>
  );
};

export default RentOrBuyCalculatorPage;
