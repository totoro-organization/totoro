import { TextareaAutosize } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormTextArea {
  name: string;
  label?: string;
  defaultValue?: string;
  minRows?: number;
  placeholder?: string;
}

const FormTextarea = ({
  name,
  minRows = 3,
  defaultValue,
  placeholder = null,
  ...props
}: IFormTextArea) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextareaAutosize
          {...field}
          aria-label="minimum height"
          minRows={minRows}
          placeholder={placeholder}
          style={{ width: '100%', height: 150, maxWidth: '' }}
        />
      )}
      defaultValue={defaultValue}
    />
  );
};

export default FormTextarea;
