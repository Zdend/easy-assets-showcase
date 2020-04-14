import React, { useCallback, MutableRefObject } from 'react';
import { useField } from 'formik';
import { Form } from 'antd';
import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea';
import { getFieldFeedbackProps, EnhancedFormItemProps } from '@/utils/form';
import useLazyOnChange, { LazyOnChangeOptions } from '../../hooks/useLazyOnChange';
import { css } from '@emotion/core';

const formItemStyle = css`
  &.ant-form-item-has-feedback .ant-form-item-children-icon {
    bottom: 1rem;
    top: auto;
  }
`;
interface Props {
  innerRef?: MutableRefObject<HTMLTextAreaElement>;
}

const TextAreaField: React.FunctionComponent<TextAreaProps &
  EnhancedFormItemProps &
  Props &
  LazyOnChangeOptions> = props => {
  const { label, name } = props;
  const [field, meta] = useField(name);
  const { innerRef, eager, delay, ...inputProps } = props;
  const [value, onChange] = useLazyOnChange(field, { eager, delay });
  const getInnerRef = useCallback(
    node => {
      if (innerRef) {
        innerRef.current = node?.resizableTextArea?.textArea;
      }
    },
    [innerRef]
  );

  return (
    <Form.Item css={formItemStyle} {...{ label }} {...getFieldFeedbackProps(meta)}>
      <TextArea {...field} {...inputProps} {...{ value, onChange }} ref={getInnerRef} />
    </Form.Item>
  );
};

export default TextAreaField;
