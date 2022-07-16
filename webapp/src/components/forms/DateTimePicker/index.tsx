import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormDateTimePicker {
  name: string;
  label?: string;
  minDateTime?: any;
  maxDateTime?: any;
  handleChangeDate?: (date: Date) => void;
  defaultValue?: any;
  disabled?: boolean;
  minutesStep?: number;
  disablePast?: boolean;
  minDate?: any;
  maxDate?: any;
  minTime?: any;
  maxTime?: any;
}

function FormDateTimePicker({
  label,
  name,
  minDateTime,
  maxDateTime,
  minDate,
  maxDate,
  minTime,
  maxTime,
  defaultValue,
  handleChangeDate,
  disabled,
  disablePast,
  minutesStep = 1,
  ...props
}: IFormDateTimePicker): JSX.Element {
  const { control } = useFormContext();

  const [value, setValue] = useState<Date | string>(defaultValue ?? null);

  const handleChange = (date, onChange) => {
    setValue(date);
    onChange(date);    
    if (handleChangeDate) handleChangeDate(date);
  };

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <DateTimePicker
                disablePast={disablePast}
                minutesStep={minutesStep}
                disabled={disabled}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                minTime={minTime}
                maxTime={maxTime}
                minDate={minDate}
                maxDate={maxDate}
                inputFormat="dd/MM/yyyy HH:mm"
                label={label}
                value={value}
                onChange={(data) => handleChange(data, field.onChange)}
                renderInput={(params) => <TextField {...params} />}
                // onError={(error, value) => console.log(error, value)}
              />
              {!!error && (
                <FormHelperText error={!!error}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
          defaultValue={defaultValue}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default FormDateTimePicker;
