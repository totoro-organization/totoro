import React, { useState } from "react";
import { View } from "react-native";
import Input from "../atoms/Input";
import getFormatDateFrenchLocale from "../../common/utils/getFormatDateFrenchLocale";
import Spacer from "../atoms/Spacer";
import { Text } from "../atoms/Text";
import styled from "styled-components/native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useForm } from "react-hook-form";
import useBoolean from "../../common/hooks/useBoolean";

type DateTimePickerInputProps = {
  label?: string;
  onChange: any;
  name: string;
};

const DEFAULT_DATE = new Date("1999-03-12");

export default function DateTimePickerInput({
  label,
  onChange,
  name,
}: DateTimePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | DateTimePickerEvent>(
    DEFAULT_DATE
  );
  const [showCalendar, setShowCalendar] = useBoolean();

  const { setValue } = useForm();

  function getSelectedDate(date: Date | DateTimePickerEvent) {
    setSelectedDate(date);
    setValue(name, date);
    setShowCalendar.toggle();
  }

  return (
    <View>
      {label && <Text>{label}</Text>}

      <Spacer axis="vertical" size={0.5} />

      <Input
        onPressIn={setShowCalendar.toggle}
        placeholder={getFormatDateFrenchLocale(DEFAULT_DATE)}
        value={getFormatDateFrenchLocale(selectedDate as Date)}
        editable={false}
      />

      {showCalendar && (
        <DateTimePickerModal
          date={DEFAULT_DATE}
          isVisible={showCalendar}
          mode="date"
          onConfirm={(date) => getSelectedDate(date)}
          onCancel={setShowCalendar.toggle}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const ErrorMessage = styled(Text)`
  color: ${({ theme }) => theme.colors.error[500]};
  min-height: 16px;
  font-size: 12px;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;
