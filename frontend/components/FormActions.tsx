import React from 'react';
import { Form, Button } from 'antd';
import { useFormikContext } from 'formik';
import { handleCancel } from '@/utils/form';

interface Props {
  children?: JSX.Element | JSX.Element[];
  hideUndo?: boolean;
}

function FormActions({ children, hideUndo }: Props) {
  const { isSubmitting, dirty, resetForm } = useFormikContext();
  return (
    <Form.Item className="mt-4">
      <div className="flex">
        <Button htmlType="submit" loading={isSubmitting} type="primary">
          Save
        </Button>
        {!hideUndo && dirty && (
          <Button htmlType="button" type="link" className="ml-2" onClick={handleCancel(resetForm)}>
            Undo
          </Button>
        )}
        <div className="flex-1 inline-flex items-center justify-end">{children}</div>
      </div>
    </Form.Item>
  );
}

export default FormActions;
