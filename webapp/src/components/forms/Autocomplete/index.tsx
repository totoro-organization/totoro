// @ts-noCheck
import { Autocomplete, TextField } from '@mui/material';
import { Control, Controller, Path } from 'react-hook-form';

interface IFormAutocomplete<FormFieldTypes, Option> {
  name: Path<FormFieldTypes>;
  label: string;
  control?: Control<FormFieldTypes, object>;
  defaultValue?: string;
  options: Option[]
}

function FormAutocomplete<FormFieldValues, Option>({
  options,
  label,
  name,
  multiple = false,
  ...props
}: IFormAutocomplete<FormFieldValues, Option>) {
  // const handleGetOptionsKey = (options, field) => {
  //     const optionsKeys = options.map(option => option[value]);
  //     field.onChange(optionsKeys);
  // }

  // const test = () => {

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
}

export default FormAutocomplete;
