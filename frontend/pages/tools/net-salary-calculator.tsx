import React from 'react';
import { NextPage } from 'next';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';
import NetSalaryCalculator from '@/components/NetSalaryCalculator';
import { Paragraph } from '@/components/Typography';

const description = `Calculate your net income, net superannuation and how much money you will pay on taxes.`

const NetSalaryCalculatorPage: NextPage = () => {
  return (
    <PublicSimpleContentLayout 
      meta={{ 
        title: 'Net salary calculator after tax Australia',
        description,
      }}
      title="Net Salary Calculator">
      <Paragraph size="large">{description}</Paragraph>
      <NetSalaryCalculator />
    </PublicSimpleContentLayout>
  );
};

export default NetSalaryCalculatorPage;
