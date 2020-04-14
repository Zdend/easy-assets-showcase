import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface Props {
  link?: string;
}

const BackLink: React.FC<Props> = ({ link }) => {
  return (
    <div className="mb-2">
      <Link href={link || '/'}>
        <a>
          <ArrowLeftOutlined/> Back
        </a>
      </Link>
    </div>
  );
};

export default BackLink;
