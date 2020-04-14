export const convertFileToDataUrl = async (file: File | Blob): Promise<string | null> => {
  if (URL && typeof URL.createObjectURL === 'function') {
    return URL.createObjectURL(file);
  }
  if (FileReader) {
    const reader = new FileReader();
    const loadFilePromise = new Promise<string>(resolve => {
      reader.onload = () => resolve(reader.result as string);
    });
    reader.readAsDataURL(file);
    return loadFilePromise;
  }

  throw new Error('File reading is not supported.');
};
