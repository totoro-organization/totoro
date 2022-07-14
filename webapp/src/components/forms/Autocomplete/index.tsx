import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormAutocomplete {
  name: string;
  label?: string;
  options: any[];
  defaultValue?: any;
  multiple?: boolean;
  getOptionLabel?: (option) => string,
  isOptionEqualToValue?: (option: any, value: any) => boolean
}

function FormAutocomplete({
  options = [],
  label,
  name,
  multiple = false,
  defaultValue,
  getOptionLabel,
  isOptionEqualToValue,
  ...props
}: IFormAutocomplete) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange, ...field}, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          multiple={multiple}
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message}
            />
          )}
          onChange={(e, data) => onChange(data)}
          {...props}
        />
      )}
      defaultValue={defaultValue}
      name={name}
      control={control}
    />
  );
}

export default FormAutocomplete;
