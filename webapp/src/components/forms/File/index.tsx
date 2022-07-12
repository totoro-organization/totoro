import { Button, styled } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const Input = styled('input')({
  display: 'none'
});

interface IFormInputfile {
  name: string;
  buttonLabel?: string;
  multiple?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

function FormInputFile({
  name,
  buttonLabel,
  startIcon,
  endIcon,
  multiple = false
}: IFormInputfile) {
  const [images, setImages] = useState<File[]>();

  // const [preview, setPreview] = useState<string | null>();

  const { control } = useFormContext();

  // useEffect(() => {
  //     if (image) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPreview(reader.result as string);
  //       };
  //       reader.readAsDataURL(image);
  //     } else {
  //       setPreview(null);
  //     }
  //   }, [image]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <label htmlFor={`${name}-inputFile`}>
          <Input
            onChange={(e) => field.onChange(e.target.files)}
            accept="image/*"
            id={`${name}-inputFile`}
            type="file"
            {...field}
          />
          <Button
            startIcon={startIcon}
            endIcon={endIcon}
            variant="outlined"
            color="primary"
            component="span"
          >
            {buttonLabel}
          </Button>
        </label>
      )}
    />
  );
}
export default FormInputFile;
