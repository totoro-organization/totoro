import { FormControl, FormHelperText, InputLabel, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function FormSelect({
  name,
  label,
  defaultValue,
  ...props
}: SelectProps): JSX.Element {
  const { control } = useFormContext();
  const [value, setValue] = useState(defaultValue);

  return (
      <Controller
        render={({ field, fieldState: { error } }) => (
          <FormControl>
            <InputLabel>{label}</InputLabel>
           <Select
            value={value ?? ""}
            fullWidth
            label={label}
            onChange={(e: SelectChangeEvent<any>) => {
              setValue(e.target.value);
              field.onChange(e.target.value);
            }}
            error={!!error}
            {...props}
          />
            {!!error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
          </FormControl>
          
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
  );
}

export default FormSelect;
