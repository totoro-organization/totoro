import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FormControl, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { useState } from 'react';
import { Control, Controller, Path } from 'react-hook-form';

interface IFormDateTimePicker<FormFieldTypes> {
  name: Path<FormFieldTypes>,
  label: string,
  minDate?: Date,
  maxDate?: Date,
  handleChangeDate?: (date: Date) => void,
  control?: Control<FormFieldTypes, object>
}

function FormDateTimePicker<FormFieldTypes>({
  label,
  name,
  minDate = null,
  maxDate = null,
  handleChangeDate,
  control,
  ...props
}: IFormDateTimePicker<FormFieldTypes>) : JSX.Element{
  const [value, setValue] = useState<Date>(new Date() ?? minDate);

  const handleChange = (data, onChange) => {
    setValue(data);
    onChange(format(new Date(data), 'dd/MM/yyyy HH:mm'));
    handleChangeDate(data);
  };

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              minDate={minDate}
              maxDate={maxDate}
              inputFormat="dd/MM/yyyy HH:mm"
              label={label}
              value={value}
              onChange={(data) => handleChange(data, field.onChange)}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          {...props}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default FormDateTimePicker;
