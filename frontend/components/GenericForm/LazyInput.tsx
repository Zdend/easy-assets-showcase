import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import { getFormItemProps, EnhancedFormItemProps } from '@/utils/form';

export type LazyInputFieldProps = Omit<InputProps & EnhancedFormItemProps, 'children'>;

const LazyInputField: React.FunctionComponent<InputProps & EnhancedFormItemProps> = props => {
  const { value, name } = props;
  const [itemProps, inputProps] = getFormItemProps(props);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <Form.Item {...itemProps}>
      <Input
        {...inputProps}
        onChange={e => setInternalValue(e.target.value)}
        value={internalValue}
        name={name}
      />
    </Form.Item>
  );
};

export default LazyInputField;
