// @ts-noCheck
import { FormControl, Select, SelectChangeEvent } from '@mui/material';
import { Control, Controller, Path } from 'react-hook-form';

interface IFormSelect<FormFieldTypes> {
  name: Path<FormFieldTypes>,
  label: string,
  control?: Control<FormFieldTypes, object>,
  children: JSX.Element[],
  defaultValue?: string
}

function FormSelect<FormFieldTypes>({ name, label, control, children, ...props }: IFormSelect<FormFieldTypes>): JSX.Element {

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Select
            // value={props.defaultValue}
            fullWidth
            required
            children={children}
            label={label}
            onChange={(e) => field.onChange(e.target.value)}
            error={!!error}
          />
        )}
        {...props}
      />
    </FormControl>
  );
}

export default FormSelect;
