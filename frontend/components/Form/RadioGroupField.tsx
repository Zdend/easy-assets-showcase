import React from 'react';
import { useField } from 'formik';
import { Form, Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';
import { getFieldFeedbackProps, getFormItemProps, EnhancedFormItemProps } from '@/utils/form';

interface RadioGroupFieldProps extends Omit<RadioGroupProps, 'name'>, EnhancedFormItemProps {
  name: string;
}

const RadioGroupField: React.FunctionComponent<RadioGroupFieldProps> = props => {
  const [itemProps, inputProps] = getFormItemProps(props);
  const { name } = props;
  const [field, meta] = useField(name);

  return (
    <Form.Item {...itemProps} {...getFieldFeedbackProps(meta)}>
      <span className="pr-8">
        <Radio.Group {...field} {...inputProps} />
      </span>
    </Form.Item>
  );
};

export default RadioGroupField;
export const { Button } = Radio;
