import { FieldMetaProps } from 'formik';
import * as Yup from 'yup';
import { FormItemProps } from 'antd/lib/form';
import { showConfirm } from './modal';

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

export const handleCancel = (resetForm: Function) => async () => {
  const result = await showConfirm({ title: 'Are you sure you want to undo your changes?' });
  if (!result) {
    return;
  }
  resetForm();
};

interface FieldFeedback {
  hasFeedback: boolean;
  validateStatus: 'success' | 'error' | '';
  help: string;
}

export const getFieldFeedbackProps = (meta: FieldMetaProps<any>): FieldFeedback => {
  const isSuccessfull = meta.touched && !meta.error ? 'success' : '';
  return {
    hasFeedback: meta.touched,
    validateStatus: meta.touched && meta.error ? 'error' : isSuccessfull,
    help: meta.error
  };
};

export const requiredConstraint = (): Yup.StringSchema<string> =>
  Yup.string().required('This field is required');

export interface EnhancedFormItemProps extends Omit<FormItemProps, 'children'> {
  formItemCss?: any;
}
export const getFormItemProps = (
  props: Record<string, any>
): [EnhancedFormItemProps, Record<string, any>] => {
  const {
    label,
    colon,
    labelCol,
    wrapperCol,
    labelAlign,
    required,
    name,
    extra,
    formItemCss,
    help,
    ...inputProps
  } = props;
  const formItemProps = {
    label,
    labelCol,
    wrapperCol,
    labelAlign,
    required,
    name,
    colon,
    css: formItemCss,
    extra,
    help
  };
  return [formItemProps, inputProps];
};
