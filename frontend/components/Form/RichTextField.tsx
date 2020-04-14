import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { useFormikContext } from 'formik';
import { TextAreaProps } from 'antd/lib/input';
import { Button, Tooltip, Col, Row, Dropdown, Menu } from 'antd';
import { UploadOutlined, CalculatorOutlined, QuestionOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import UploadImage from '@/smart/UploadImage';
import TextAreaField from './TextAreaField';
import PostContent from '@/components/PostContent';
import { AVAILABLE_COMPONENTS, SMART_CONTENT_DELIMITER } from '@/components/SmartMarkedContent';
import { UploadFolder } from '@/generated/types';
import { EnhancedFormItemProps } from '@/utils/form';
import { COLORS } from '@/styles/variables';

const RichTextFieldWrapper = styled.div`
  position: relative;
  background: #fff;
  border-radius: 4px;
  overflow: none;
  border: 1px solid ${COLORS.GREY[2]};
  margin-bottom: 1rem;

  .ant-form-item {
    margin-bottom: 0;
  }

  textarea {
    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-bottom: 0 !important;
  }
`;

const RichTextFieldToolbar = styled.div`
  background: white;
  padding: 0.2rem 0.2rem;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid ${COLORS.GREY[1]};
`;

type Props = TextAreaProps &
  EnhancedFormItemProps & {
    uploadFolder: UploadFolder;
  };

const getSmartComponentMenu = (appendText: (text: string) => void) => (
  <Menu>
    {Object.keys(AVAILABLE_COMPONENTS).map(name => (
      <Menu.Item
        key={name}
        onClick={() => appendText(`${SMART_CONTENT_DELIMITER}${name}${SMART_CONTENT_DELIMITER}`)}
      >
        {name}
      </Menu.Item>
    ))}
  </Menu>
);

function RichTextField(props: Props) {
  const formikProps = useFormikContext<any>();
  const { name } = props;
  const { uploadFolder, ...inputProps } = props;
  const [preview, setPreview] = useState(false);
  const value = formikProps.values[name];
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const appendText = useCallback(
    (text: string) => {
      if (textAreaRef?.current?.selectionStart) {
        const selectionStart = +textAreaRef?.current?.selectionStart;
        const before = value.substring(0, selectionStart);
        const after = value.substring(selectionStart, value.length);
        formikProps.setFieldValue(name, `${before}\n${text}\n${after}`);
      } else {
        formikProps.setFieldValue(name, `${value}\n\n${text}`);
      }
    },
    [value, name]
  );

  return (
    <RichTextFieldWrapper>
      <RichTextFieldToolbar>
        <UploadImage
          onSuccess={url => appendText(`![Blog Image](${url})`)}
          folder={uploadFolder}
          aspectRatio={-1}
        >
          {({ loading }) => (
            <Tooltip placement="top" title="Upload Image">
              <Button type="link" loading={loading}>
                <UploadOutlined />
              </Button>
            </Tooltip>
          )}
        </UploadImage>
        <Tooltip placement="top" title={preview ? 'Hide Preview' : 'Show Preview'}>
          <Button type="link" onClick={() => setPreview(!preview)}>
            {preview ? <EyeInvisibleOutlined /> : <EyeOutlined/ >}
          </Button>
        </Tooltip>
        <Tooltip placement="top" title="Insert Smart Content">
          <Dropdown overlay={getSmartComponentMenu(appendText)}>
            <Button type="link">
              <CalculatorOutlined />
            </Button>
          </Dropdown>
        </Tooltip>
        <Tooltip placement="top" title="Markdown cheatsheet">
          <a
            href="https://devhints.io/markdown"
            target="_blank"
            className="p-2 px-4"
            rel="noopener noreferrer"
          >
            <QuestionOutlined />
          </a>
        </Tooltip>
      </RichTextFieldToolbar>
      {preview && (
        <Row justify="center" className="p-2">
          <Col xl={12}>
            <PostContent content={value} />
          </Col>
        </Row>
      )}
      {!preview && <TextAreaField {...inputProps} innerRef={textAreaRef} />}
    </RichTextFieldWrapper>
  );
}

export default RichTextField;
