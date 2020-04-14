import React from 'react';
import { useField } from 'formik';
import { Form, Input } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import { getFieldFeedbackProps, getFormItemProps, EnhancedFormItemProps } from '@/utils/form';
import useLazyOnChange, { LazyOnChangeOptions } from '../../hooks/useLazyOnChange';

const InputField: React.FunctionComponent<InputProps &
  EnhancedFormItemProps &
  LazyOnChangeOptions> = props => {
  const [itemProps, { eager, delay, ...inputProps }] = getFormItemProps(props);
  const { name } = props;
  const [field, meta] = useField(name);

  const [value, onChange] = useLazyOnChange<HTMLInputElement>(field, { eager, delay });
  return (
    <Form.Item {...itemProps} {...getFieldFeedbackProps(meta)}>
      <Input {...field} {...inputProps} onChange={onChange} value={value} name={name} />
    </Form.Item>
  );
};

export default InputField;
