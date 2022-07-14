import styled from '@emotion/styled';
import { add, format } from 'date-fns';
import { useEffect, useState } from 'react';
import FormDateTimePicker from 'src/components/forms/DateTimePicker';

interface IFormDateTimeRangePicker {
  config?: {
    label_1: string;
    label_2: string;
    name_1: string;
    name_2: string;
  };
  name: string,
}

const Container = styled('div')({
  display: 'flex',
  columnGap: 16,
});

function FormDateTimeRangePicker({
  name
}: IFormDateTimeRangePicker): JSX.Element {
  const now: any =  new Date().setSeconds(0,0);;
  const [startDate, setStartDate] = useState<Date>();
  const [endMinDate, setEndMinDate] = useState<Date>(add(now, { minutes: 30 }));

  const handleChangeStartDate = (date?: Date) => {    
    if (date) {
      date.setSeconds(0,0);
      setStartDate(date);
      setEndMinDate(add(date, { minutes: 30 }))
    }
  };

  return (
    <Container>
      {/* TO FIX:  
        - minutesStep raise error
      */}
      <FormDateTimePicker
        handleChangeDate={handleChangeStartDate}
        minDateTime={now}
        defaultValue={now}
        name={'start_date'}
        label={'Date et heure de début'}
        // minutesStep={5}
      />
      <FormDateTimePicker
        // disabled={startDate ? false : true}
        defaultValue={endMinDate}
        minDateTime={endMinDate}
        name={'end_date'}
        label={'Date et heure de fin'}
        // minutesStep={5}
      />
    </Container>
  );
}

export default FormDateTimeRangePicker;
