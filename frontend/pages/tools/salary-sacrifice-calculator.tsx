import React from 'react';
import { NextPage } from 'next';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';
import SalarySacrificeCalculator from '@/components/SalarySacrificeCalculator';
import { Paragraph } from '@/components/Typography';

const description = `Salary sacrifice is a popular choice for people nearing retirement age to minise tax spent and maximise superannuation savings.
Calculate how much money you save on taxes if you sacrifice extra salary.`

const SalarySacrificeCalculatorPage: NextPage = () => {
  return (
    <PublicSimpleContentLayout 
      meta={{ 
        title: 'Salary sacrifice calculator for superannuation & tax return',
        description,
      }}
      title="Salary Sacrifice Calculator">
      <Paragraph size="large">{description}</Paragraph>
      <SalarySacrificeCalculator />
    </PublicSimpleContentLayout>
  );
};

export default SalarySacrificeCalculatorPage;
