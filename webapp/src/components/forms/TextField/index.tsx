import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormTextField = ({
  label,
  name,
  ...props
}) => {
  return (
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={label}
            error={!!error}
            helperText={error?.message}
          />
        )}
        {...props}
      />
  );
};

export default FormTextField