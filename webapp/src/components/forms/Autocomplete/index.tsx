import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormAutocomplete = ({ options, label, name, multiple = false, ...props }) => {

    // const handleGetOptionsKey = (options, field) => {
    //     const optionsKeys = options.map(option => option[value]);
    //     field.onChange(optionsKeys);
    // }

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
            multiple={multiple}
          limitTags={4}
          options={options}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error?.message}
              {...params}
            />
          )}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      {...props}
    />
  );
};

export default FormAutocomplete;
