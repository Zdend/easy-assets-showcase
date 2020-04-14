import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Form } from 'antd';
import Select, { SelectProps } from 'antd/lib/select';
import { getFieldFeedbackProps, getFormItemProps, EnhancedFormItemProps } from '@/utils/form';

interface SelectFieldProps extends SelectProps<{}>, EnhancedFormItemProps {
  name: string;
}

const SelectField: React.FunctionComponent<SelectFieldProps> = props => {
  const [itemProps, inputProps] = getFormItemProps(props);
  const { name } = props;
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  return (
    <Form.Item {...itemProps} {...getFieldFeedbackProps(meta)}>
      <Select
        showArrow
        {...field}
        {...inputProps}
        onChange={value => setFieldValue(name, value)}
        onBlur={() => setFieldTouched(name, true)}
      />
    </Form.Item>
  );
};

export default SelectField;
export const { Option } = Select;
