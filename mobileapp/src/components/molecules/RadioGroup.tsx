import React, { useState } from "react";
import { View } from "react-native";
import Radio from "../atoms/Radio";
import Spacer from "../atoms/Spacer";
import { Text } from "../atoms/Text";

type RadioGroupProps = {
  options: string[];
  handlePress: (selectedOption: string) => void;
};

export default function RadioGroup({ options, handlePress }: RadioGroupProps) {
  const [radioIndex, setRadioIndex] = useState<number | undefined>(undefined);

  const lastOption = options[options.length - 1];

  return (
    <View>
      {options.map((option, index) => (
        <View key={option}>
          <Radio
            option={option}
            checked={index === radioIndex}
            handlePress={() => {
              handlePress(option);
              setRadioIndex(index);
            }}
          />

          {option !== lastOption && <Spacer axis="vertical" size={0.5} />}
        </View>
      ))}
    </View>
  );
}
