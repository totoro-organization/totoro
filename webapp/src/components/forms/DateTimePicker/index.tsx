import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FormControl, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { useState } from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';

interface IFormDateTimePicker {
  name: string,
  label: string,
  minDate?: Date,
  maxDate?: Date,
  handleChangeDate?: (date: Date) => void,
}

function FormDateTimePicker({
  label,
  minDate = null,
  maxDate = null,
  handleChangeDate,
  ...props
}: IFormDateTimePicker & UseControllerProps<any>) {
  const [value, setValue] = useState<Date>(new Date() ?? minDate);

  const handleChange = (data, field) => {
    setValue(data);
    field.onChange(format(new Date(data), 'dd/MM/yyyy HH:mm'));
    handleChangeDate(data);
  };

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              minDate={minDate}
              maxDate={maxDate}
              inputFormat="dd/MM/yyyy HH:mm"
              label={label}
              value={value}
              onChange={(data) => handleChange(data, field)}
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
