import React from 'react';
import { NextPage } from 'next';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';
import MoneyAllocationChart from '@/components/MoneyAllocationChart';
import { Paragraph } from '@/components/Typography';

const description = `See where your money is going every month and optimize your spendings to maximise savings.`

const MoneyAllocationChartPage: NextPage = () => {
  return (
    <PublicSimpleContentLayout 
    meta={{ 
      title: 'Online budget calculator and budget planner',
      description,
    }}
    title="Money Allocation Chart">
      <Paragraph size="large">{description}</Paragraph>
      <MoneyAllocationChart />
    </PublicSimpleContentLayout>
  );
};

export default MoneyAllocationChartPage;
