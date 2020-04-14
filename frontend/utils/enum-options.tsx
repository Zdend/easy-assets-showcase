import React from 'react';
import { Option } from '@/components/Form/SelectField';
import { Button } from '@/components/Form/RadioGroupField';

const transformKey = (key: string): string => {
  return key ? key.replace(/_/g, ' ').toLowerCase() : '';
};

function createOptionsFromEnum(
  enumObject: Record<string, string>,
  component: 'Option' | 'RadioButton' = 'Option'
) {
  const OptionComponent =
    component === 'RadioButton' ? (Button as React.ComponentType<any>) : Option;

  return Object.entries(enumObject).map(([key, value]) => (
    <OptionComponent key={key} value={value}>
      <span className="capitalize">{transformKey(key)}</span>
    </OptionComponent>
  ));
}

export default createOptionsFromEnum;
