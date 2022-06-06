import React, { useState } from "react";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Box from "./Box";
import Spacer from "./Spacer";
import { Text } from "./Text";

type RadioProps = {
  options: string[];
  handlePress: (selectedOption: string) => void;
};

export default function Radio({ options, handlePress }: RadioProps) {
  const [radioIndex, setRadioIndex] = useState<number | undefined>(undefined);

  function getRadioIndex(index: number) {
    setRadioIndex(index);
  }

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity
          onPress={() => {
            handlePress(option);
            getRadioIndex(index);
          }}
          key={option}
        >
          <Box flexDirection="row" alignItems="center">
            <Dot>
              <DotActive $checked={index === radioIndex} />
            </Dot>
            <Spacer axis="horizontal" size={0.5} />

            <Label $checked={index === radioIndex}>{option}</Label>
          </Box>
          <Spacer axis="vertical" size={0.5} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const Dot = styled.View`
  width: 24px;
  height: 24px;
  border: ${({ theme }) => theme.border.width[1]} solid
    ${({ theme }) => theme.colors.grey[900]};
  border-radius: ${({ theme }) => theme.border.radius.circle};
  align-items: center;
  justify-content: center;
`;

const DotActive = styled.View<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.border.radius.circle};
  background-color: ${({ theme }) => theme.colors.grey[900]};
  opacity: ${({ $checked }) => ($checked ? "1" : "0")};
`;

const Label = styled(Text)<{ $checked: boolean }>`
  color: ${({ $checked, theme }) =>
    $checked ? theme.colors.grey[900] : theme.colors.grey[500]};
`;
