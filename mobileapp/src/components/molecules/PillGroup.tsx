import React, { useState } from "react";
import { View } from "react-native";
import Pill from "../atoms/Pill";
import Spacer from "../atoms/Spacer";

type PillGroupProps = {
  options: string[];
  handlePress: (selectedOptions: string[]) => void;
};

export default function PillGroup({ options, handlePress }: PillGroupProps) {
  const [selectedPill, setSelectedPill] = useState<any>([]);
  const lastOption = options[options.length - 1];

  const pillAlreadySelected = (option: string) =>
    selectedPill?.filter((pill: string) => pill === option);

  function addSelectedPill(option: string) {
    if (pillAlreadySelected(option).length > 0) {
      return setSelectedPill(
        selectedPill?.filter((item: string) => item !== option)
      );
    }

    setSelectedPill((prevPill: string[]) => [...prevPill, option]);
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((option) => (
        <View key={option} style={{ flexDirection: "row" }}>
          <Pill
            label={option}
            checked={pillAlreadySelected(option).length > 0}
            handlePress={() => {
              handlePress(selectedPill);
              addSelectedPill(option);
            }}
          />

          {option !== lastOption && <Spacer axis="horizontal" size={0.25} />}
        </View>
      ))}
    </View>
  );
}
