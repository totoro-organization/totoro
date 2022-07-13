import { Button, styled } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const Input = styled('input')({
  display: 'none'
});

interface IFormUpload {
  name: string;
  buttonLabel?: string;
  multiple?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

function FormUpload({
  name,
  buttonLabel,
  startIcon,
  endIcon,
  multiple = false,
}: IFormUpload) {
  const [files, setFiles] = useState<any>([]);
  const { control } = useFormContext();

  const handleMultipleFiles = (files) => {
    // if (file && file.type.substr(0, 5) === "file") setFile(file);
    setFiles([...files]);
  };

  const handleDeleteFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <label htmlFor={`${name}-inputFile`}>
            <Input
              onChange={(e) => {
                field.onChange(e.target.files);
                handleMultipleFiles(e.target.files);
              }}
              multiple={multiple}
              accept="file/*"
              id={`${name}-inputFile`}
              type="file"
              // {...field}
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
      {files.length ? <span>{files.length} fichier(s) sélectionné(s)</span> : null}
    </>
  );
}
export default FormUpload;
