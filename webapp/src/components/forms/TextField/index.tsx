import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormTextField {
  name: string,
  label: string,
  defaultValue?: string | number,
  inputProps?: any,
  type?: string
}

function FormTextField ({
  label,
  name,
  type = "text",
  inputProps = {},
  defaultValue,
  ...props
}: IFormTextField) : JSX.Element {

  const { control } = useFormContext();

  return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            inputProps={inputProps}
            type={type}
            label={label}
            error={!!error}
            helperText={error?.message}
          />
        )}
        defaultValue={defaultValue}
      />
  );
};

export default FormTextField