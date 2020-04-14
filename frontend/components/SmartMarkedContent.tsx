import React from 'react';
import MarkedContent from '@/components/MarkedContent';
import NetSalaryCalculator from '@/components/NetSalaryCalculator';
import CompoundInterestChart from '@/components/CompoundInterestChart';
import MoneyAllocationChart from '@/components/MoneyAllocationChart';
import LoanRepaymentChart from '@/components/LoanRepaymentChart';
import RentOrBuyCalculator from '@/components/RentOrBuyCalculator';
import SalarySacrificeCalculator from '@/components/SalarySacrificeCalculator';

export const SMART_CONTENT_DELIMITER = '@@@';
const NAME_PATTERN = new RegExp(`${SMART_CONTENT_DELIMITER}(\\w+)${SMART_CONTENT_DELIMITER}`);
const SPLIT_PATTERN = new RegExp(`(${SMART_CONTENT_DELIMITER}\\w+${SMART_CONTENT_DELIMITER})`);

export const AVAILABLE_COMPONENTS = {
  NetSalaryCalculator,
  CompoundInterestChart,
  MoneyAllocationChart,
  LoanRepaymentChart,
  RentOrBuyCalculator,
  SalarySacrificeCalculator
};

interface Props {
  content: string | null | undefined;
  size?: 'large' | 'regular';
}

const SmartMarkedContent = ({ content, size }: Props) => {
  if (!content) {
    return null;
  }

  const matches = content.split(SPLIT_PATTERN);

  const smartContent = matches.map(token => {
    const tokenMatches = token.match(NAME_PATTERN);
    const componentName = tokenMatches && tokenMatches.length > 0 ? tokenMatches[1] : null;
    const Component = AVAILABLE_COMPONENTS[componentName];
    if (!Component) {
      return <MarkedContent content={token} key={token} size={size} />;
    }
    return <Component key={token} />;
  });

  return <>{smartContent}</>;
};

export default SmartMarkedContent;
