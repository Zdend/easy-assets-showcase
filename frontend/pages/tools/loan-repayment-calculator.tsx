import React from 'react';
import { NextPage } from 'next';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';
import LoanRepaymentChart from '@/components/LoanRepaymentChart';
import { Paragraph } from '@/components/Typography';

const description = `Calculate how long it will take to repay a loan. The red area should be as small as possible to minimise the amount of money paid on interest.
 Always have a clear plan for repayements as some loans might turn into a financial trap where interest gradually accumulates instead of decreases.`

const LoanRepaymentChartPage: NextPage = () => {
  return (
    <PublicSimpleContentLayout 
    meta={{ 
      title: 'Loan repayment calculator for home loan, car loan, personal loan, etc.',
      description,
    }}
    title="Loan Repayment Calculator">
      <Paragraph size="large">{description}</Paragraph>
      <LoanRepaymentChart />
    </PublicSimpleContentLayout>
  );
};

export default LoanRepaymentChartPage;
