// @ts-noCheck
import { TextField } from '@mui/material';
import { Control, Controller, Path } from 'react-hook-form';

interface IFormTextField<FormFieldTypes> {
  name: Path<FormFieldTypes>,
  label: string,
  control?: Control<FormFieldTypes, object>,
  defaultValue?: string,
  inputProps?: any,
}

function FormTextField<FormFieldTypes> ({
  label,
  name,
  control,
  type = "text",
  inputProps = {},
  ...props
}: IFormTextField<FormFieldTypes>) : JSX.Element {

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
      />
  );
};

export default FormTextField