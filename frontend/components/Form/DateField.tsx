import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Form, DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { getFieldFeedbackProps, getFormItemProps, EnhancedFormItemProps } from '@/utils/form';
import { DATE_INPUT_FORMAT } from '@/utils/constants';
import moment from 'moment';
import { css } from '@emotion/core';

const formItemStyle = css`
  & .ant-picker {
    display: flex;
  }
`;

const DateField: React.FunctionComponent<DatePickerProps &
  EnhancedFormItemProps> = props => {
  const [{ name: _, ...itemProps}, inputProps] = getFormItemProps(props);
  const { name } = props;
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const dateValue = field.value ? moment(field.value) : null;

  return (
    <Form.Item {...itemProps} {...getFieldFeedbackProps(meta)} css={formItemStyle}>
      <DatePicker  
        {...inputProps} 
        value={dateValue} 
        onChange={(momentValue) => setFieldValue(name, momentValue ? momentValue.toISOString() : null)}
        onBlur={() => setFieldTouched(name, true)}
        picker="date" 
        format={DATE_INPUT_FORMAT}
        name={name} 
        />
    </Form.Item>
  );
};

export default DateField;
