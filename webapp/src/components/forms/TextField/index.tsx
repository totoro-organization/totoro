import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

function FormTextField ({
  name,
  defaultValue,
  ...props
}: TextFieldProps) : JSX.Element {

  const { control } = useFormContext();

  return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            {...props}
            error={!!error}
            helperText={error?.message}
          />
        )}
        defaultValue={defaultValue}
      />
  );
};

export default FormTextField