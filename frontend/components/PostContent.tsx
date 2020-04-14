import React from 'react';
import { Empty } from 'antd';
import SmartMarkedContent from './SmartMarkedContent';

interface Props {
  content: string | null | undefined;
  size?: 'large' | 'regular';
}

function PostContent({ content, size }: Props) {
  if (!content) {
    return <Empty description="We are working on the content.." />;
  }

  return <SmartMarkedContent content={content} size={size} />;
}

export default PostContent;
