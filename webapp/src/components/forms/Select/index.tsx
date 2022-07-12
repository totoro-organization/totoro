import { FormControl, InputLabel, Select } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormSelect {
  name: string;
  label?: string;
  children: JSX.Element[];
  defaultValue?: any;
}

function FormSelect({
  name,
  label,
  children,
  defaultValue
}: IFormSelect): JSX.Element {
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
            required
            children={children}
            label={label}
            onChange={(e) => {
              setValue(e.target.value);
              field.onChange(e.target.value);
            }}
            error={!!error}
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
