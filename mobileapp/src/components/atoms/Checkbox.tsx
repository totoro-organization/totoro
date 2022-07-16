import React from "react";
import styled from "styled-components/native";
import Check from "../../assets/icons/Check";
import useBoolean from "../../common/hooks/useBoolean";
import Spacer from "./Spacer";
import { Text } from "./Text";

type CheckboxProps = {
  label: string;
  onValueChange?: (checked: boolean) => void;
};

export default function Checkbox({ label, onValueChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useBoolean();

  function handleChange() {
    setIsChecked.toggle();

    if (onValueChange) onValueChange(!isChecked);
  }

  return (
    <Container onPress={handleChange}>
      <CheckboxWrapper $checked={isChecked}>
        {isChecked && <Check size={18} color="white" />}
      </CheckboxWrapper>

      <Spacer axis="horizontal" size={0.5} />

      <Text color={isChecked ? "black" : "grey"}>{label}</Text>
    </Container>
  );
}

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const CheckboxWrapper = styled.View<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.colors.core.black.base};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.core.black.base : "transparent"};
`;
