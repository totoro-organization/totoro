import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Box from "./Box";
import Spacer from "./Spacer";
import { Text } from "./Text";

type RadioProps = {
  option: string;
  checked: boolean;
  handlePress: (selectedOption: string) => void;
};

export default function Radio({
  option,
  checked = false,
  handlePress,
}: RadioProps) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handlePress(option);
        }}
      >
        <Box flexDirection="row" alignItems="center">
          <Dot>
            <DotActive $checked={checked} />
          </Dot>
          <Spacer axis="horizontal" size={0.5} />

          <Label $checked={checked}>{option}</Label>
        </Box>
      </TouchableOpacity>
    </View>
  );
}

const Dot = styled.View`
  width: 24px;
  height: 24px;
  border: ${({ theme }) => theme.border.width[1]} solid
    ${({ theme }) => theme.colors.core.black.base};
  border-radius: ${({ theme }) => theme.border.radius.circle};
  align-items: center;
  justify-content: center;
`;

const DotActive = styled.View<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.border.radius.circle};
  background-color: ${({ theme }) => theme.colors.core.black.base};
  opacity: ${({ $checked }) => ($checked ? "1" : "0")};
`;

const Label = styled(Text)<{ $checked: boolean }>`
  color: ${({ $checked, theme }) =>
    $checked ? theme.colors.core.black.base : theme.colors.v1.grey[500]};
`;
