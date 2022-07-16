import { IconButton, styled } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const Container = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
  width: '100%'
});

const ImageCard = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  width: 200,
  height: 200,
  position: 'relative'
});

interface ImagePreviewProps {
  images: File[];
  handleDeleteImage?: (i: number) => void;
}

function ImagePreview({ images, handleDeleteImage }: ImagePreviewProps) {
  return (
    <Container>
      {Array.from(images).map((image: File, i: number) => (
        <ImageCard key={image.name}>
          <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: 8
            }}
          />
          {handleDeleteImage && (
            <IconButton
              color="primary"
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={() => handleDeleteImage(i)}
            >
              <CancelIcon />
            </IconButton>
          )}
        </ImageCard>
      ))}
    </Container>
  );
}

export default ImagePreview;
