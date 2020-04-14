import React from 'react';
import LazyInputField, { LazyInputFieldProps } from '@/components/GenericForm/LazyInput';

export interface LazyNumberFieldProps extends LazyInputFieldProps {
  setValue: Function;
}

const LazyNumberField: React.FC<LazyNumberFieldProps> = ({ label, value, setValue, ...rest }) => (
  <LazyInputField
    label={label}
    type="number"
    onBlur={e => setValue(parseFloat(e.target.value) || 0)}
    onPressEnter={e => setValue(parseFloat((e.target as any).value) || 0)}
    value={value}
    {...rest}
  />
);

export default LazyNumberField;
