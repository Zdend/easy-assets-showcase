import React, { useRef, useState, useEffect } from 'react';
import ReactCropper from 'react-cropper';
import Cropper from 'cropperjs';
import { Modal } from 'antd';

interface Props {
  src?: string;
  onChange: (blob: Blob) => void;

  maxCropHeight?: number;

  aspectRatio?: number;
}

function ImageCropper({ src, onChange, maxCropHeight = 800, aspectRatio = 1 }: Props) {
  if (!src) {
    return null;
  }

  const [cropperActive, setCropperActive] = useState(false);
  const [cropping, setCropping] = useState(false);
  useEffect(() => {
    setCropperActive(!!src);
  }, [src]);

  const cropperRef = useRef(null);
  const handleCrop = () => {
    const cropper = cropperRef?.current?.cropper as Cropper;
    if (!cropper) {
      return;
    }

    setCropping(true);
    const { height, width } = cropper.getCroppedCanvas();
    const targetCrop: Cropper.GetCroppedCanvasOptions = { height, width, maxHeight: maxCropHeight };
    cropper.getCroppedCanvas(targetCrop).toBlob(blob => {
      onChange(blob);
      setCropperActive(false);
      setCropping(false);
    }, 'image/webp');
  };

  return (
    <Modal
      title="Crop Image"
      visible={cropperActive}
      onOk={handleCrop}
      onCancel={() => setCropperActive(false)}
      confirmLoading={cropping}
      maskClosable={false}
      okText="Upload"
      destroyOnClose
    >
      <div>
        {cropperActive && (
          <ReactCropper
            ref={cropperRef as any}
            src={src}
            style={{ height: 400, width: '100%' }}
            // Cropper.js options
            viewMode={2}
            aspectRatio={aspectRatio}
            guides={false}
            minCropBoxHeight={100}
            minCropBoxWidth={100}
            cropstart={() => setCropping(true)}
            cropend={() => setCropping(false)}
          />
        )}
      </div>
    </Modal>
  );
}

export default ImageCropper;
