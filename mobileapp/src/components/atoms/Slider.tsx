import React from "react";
import styled from "styled-components/native";
import { Slider as NativeSlider } from "@miblanchard/react-native-slider";
import { Text } from "./Text";
import { View } from "react-native";

type SliderProps = {
  minimumValue: number;
  maximumValue: number;
  animationType?: "spring" | "timing";
  value: number | number[];
  onValueChange?: (value: number | number[]) => void;
};

export default function Slider({ ...rest }: SliderProps) {
  return (
    <View>
      <NativeSlider step={1} trackClickable {...rest} />

      <RangesWrapper>
        <Text size="sm">{rest.minimumValue}</Text>
        <Text size="sm">{rest.maximumValue}</Text>
      </RangesWrapper>
    </View>
  );
}

const RangesWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;
