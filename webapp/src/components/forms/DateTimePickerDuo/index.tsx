// @ts-noCheck
import { add } from 'date-fns';
import { useEffect, useState } from 'react';
import { Control, UseControllerProps } from 'react-hook-form';
import FormDateTimePicker from 'src/components/forms/DateTimePicker';

interface IFormDateTimePickerDuo<FormFieldTypes> {
  config?: {
    label_1: string;
    label_2: string;
    name_1: string;
    name_2: string;
  };
  control?: Control<FormFieldTypes, object>;
}

function FormDatePickerDuo<FormFieldTypes>({
  control
}: IFormDateTimePickerDuo<FormFieldTypes>): JSX.Element {
  const [startDate, setStartDate] = useState<Date>();
  const [startMaxDate, setStartMaxDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [endMinDate, setEndMinDate] = useState<Date>();

  const handleChangeDate = (moment: 'start' | 'end') => {
    if (moment === 'start') {
      return handleChangeStartDate;
    } else return handleChangeEndDate;
  };
  const handleChangeStartDate = (date?: Date) => {
    if (date) {
      setStartDate(date);
      setEndMinDate(add(date, { minutes: 30 }));
    }
  };
  const handleChangeEndDate = (date?: Date) => {
    if (date) {
      setEndDate(date);
      setStartMaxDate(add(date, { minutes: -30 }));
    }
  };

  return (
    <>
      <FormDateTimePicker<FormFieldTypes>
        handleChangeDate={() => handleChangeDate('start')}
        minDate={new Date()}
        maxDate={startMaxDate}
        control={control}
        name={'start_date'}
        label={'Date et heure de début'}
      />
      <FormDateTimePicker<FormFieldTypes>
        handleChangeDate={() => handleChangeDate('end')}
        minDate={endMinDate}
        control={control}
        name={'end_date'}
        label={'Date et heure de fin'}
      />
    </>
  );
}

export default FormDatePickerDuo;
