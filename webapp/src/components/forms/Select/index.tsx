import { FormControl, InputLabel, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function FormSelect({
  name,
  label,
  defaultValue,
  ...props
}: SelectProps): JSX.Element {
  const { control } = useFormContext();
  const [value, setValue] = useState('');

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field, fieldState: { error } }) => (
          <Select
            value={value ?? defaultValue}
            fullWidth
            label={label}
            onChange={(e: SelectChangeEvent<any>) => {
              setValue(e.target.value);
              field.onChange(e.target.value);
            }}
            error={!!error}
            {...props}
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

export default FormSelect;
