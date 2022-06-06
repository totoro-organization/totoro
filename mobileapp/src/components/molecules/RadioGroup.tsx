import React, { useState } from "react";
import { View } from "react-native";
import Radio from "../atoms/Radio";

type RadioGroupProps = {
  options: string[];
  handlePress: (selectedOption: string) => void;
};

export default function RadioGroup({ options, handlePress }: RadioGroupProps) {
  const [radioIndex, setRadioIndex] = useState<number | undefined>(undefined);

  return (
    <View>
      {options.map((option, index) => (
        <Radio
          key={option}
          option={option}
          checked={index === radioIndex}
          handlePress={() => {
            handlePress(option);
            setRadioIndex(index);
          }}
        />
      ))}
    </View>
  );
}
