import { Button, styled } from '@mui/material';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

const Container = styled('div')({
  padding: 16,
  borderRadius: 4,
  border: 'dashed black 1px',
  width: '100%'
});

const Dropzone = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
  width: '100%'
});

interface IDropzoneImagePreview {
  name: string;
  multiple?: boolean;
  handleChange: (files: FileList) => void;
}

function DropzoneImagePreview({
  name,
  multiple = false,
  handleChange
}: IDropzoneImagePreview) {
  const { control } = useFormContext();
  const onDrop = useCallback((files) => {
    handleChange(files);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, ref, ...field }}) => (
          <Dropzone {...getRootProps()}>
            <input
              accept="image/*"
              id={`${name}-inputFile`}
              type="file"
              {...getInputProps()}
              multiple={multiple}
              onChange={(e) => {
                handleChange(e.target.files);
                onChange(e.target.files);
              }}
            />
            {isDragActive ? (
              <p>Drop les images ici...</p>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                startIcon={<AddIcon />}
              >
                Ajouter une image
              </Button>
            )}
          </Dropzone>
        )}
      />
    </Container>
  );
}
export default DropzoneImagePreview;
