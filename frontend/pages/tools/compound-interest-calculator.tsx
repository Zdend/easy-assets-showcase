import React from 'react';
import { NextPage } from 'next';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';
import CompoundInterestChart from '@/components/CompoundInterestChart';
import { Paragraph } from '@/components/Typography';

const description = `Simulate the effect of the powerful compound interest and see how much money you can earn by the interest itself over the years in comparison to
your annual contributions.`

const CompoundInterestCalculatorPage: NextPage = () => {
  return (
    <PublicSimpleContentLayout 
      meta={{ 
        title: 'Compound interest calculator for saving account',
        description,
      }}
      title="Compound Interest Calculator"
    >
      <Paragraph size="large">{description}</Paragraph>
      <CompoundInterestChart />
    </PublicSimpleContentLayout>
  );
};

export default CompoundInterestCalculatorPage;
