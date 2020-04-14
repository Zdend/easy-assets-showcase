import React, { useState } from 'react';
import { Avatar } from 'antd';
import { getColor } from '@/utils/color';

interface Props {
  name?: string;
  src?: string;
  size?: number;
}

const ImageAvatar = ({ name, src, size }: Props) => {
  const firstLetter = name ? name[0] : '';
  const color = getColor(firstLetter);
  const targetSize = size || 50;
  const [hasValidImage, setHasValidImage] = useState(!!src);

  return (
    <Avatar
      src={hasValidImage ? src : null}
      size={targetSize}
      alt="Company Logo"
      style={{
        backgroundColor: color,
        fontSize: `${targetSize / 2}px`,
      }}
      onError={() => {
        setHasValidImage(false);
        return false;
      }}
    >
      {firstLetter.toUpperCase()}
    </Avatar>
  );
};

export default ImageAvatar;
