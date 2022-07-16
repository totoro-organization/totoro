import { styled } from '@mui/material';
import { useState } from 'react';
import DropzoneImagePreview from './Dropzone';
import ImagePreview from './Preview';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  rowGap: 8,
  width: "100%"
});

interface IUploadImagePreview {
  name: string;
  multiple?: boolean;
}

function UploadImagePreview({ name, multiple = false }: IUploadImagePreview) {
  
  const [images, setImages] = useState<any>([]);

  const handleChange = (files: FileList) => {
    const imgFiles = Array.from(files).filter(
      (image: File) => image && image.type.startsWith('image')
    );
    setImages(imgFiles);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <Container>
        <DropzoneImagePreview name={name} multiple={multiple} handleChange={handleChange} />
        {images && images.length ? <ImagePreview images={images} handleDeleteImage={handleDeleteImage} /> : null}
    </Container>
  );
}
export default UploadImagePreview;
