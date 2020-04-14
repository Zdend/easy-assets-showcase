import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Form, Checkbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox/Checkbox';
import { getFieldFeedbackProps, getFormItemProps, EnhancedFormItemProps } from '@/utils/form';

const CheckboxField: React.FunctionComponent<CheckboxProps & EnhancedFormItemProps> = props => {
  const [itemProps, inputProps] = getFormItemProps(props);
  const { name } = props;
  const [{ value, ...field }, meta] = useField<boolean>(name);
  const { setFieldValue } = useFormikContext<any>();

  const computedFieldProps = {
    ...field,
    checked: value,
    onChange: () => setFieldValue(name, !value)
  };

  return (
    <Form.Item {...itemProps} {...getFieldFeedbackProps(meta)}>
      <Checkbox {...computedFieldProps} {...inputProps} name={name}>
        <span className="pr-5">{itemProps.label}</span>
      </Checkbox>
    </Form.Item>
  );
};

export default CheckboxField;
