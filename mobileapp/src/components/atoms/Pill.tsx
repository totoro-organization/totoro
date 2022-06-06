import React, { PropsWithChildren } from "react";
import styled from "styled-components/native";

import Spacer from "./Spacer";
import { Text } from "../atoms/Text";
import { Colors, getColors } from "../../theme/utils";

type PillVariant = "default" | "outline";
type PillColor = "black";

type PillProps = {
  variant?: PillVariant;
  checked: boolean;
  Icon?: JSX.Element;
  color?: PillColor;
  label: string;
  handlePress: (selectedLabel: string) => void;
};

export default function Pill({
  variant = "outline",
  color = "black",
  checked,
  Icon,
  label,
  handlePress,
}: PillProps) {
  return (
    <OuterLayout>
      <PillContainer
        variant={variant}
        color={color}
        checked={checked}
        onPress={() => {
          handlePress(label);
        }}
      >
        <>
          <StyledText variant={variant} color={color} checked={checked}>
            {label}
          </StyledText>

          {Icon && (
            <>
              {Icon}
              <Spacer axis="horizontal" size={0.5} />
            </>
          )}
        </>
      </PillContainer>
    </OuterLayout>
  );
}

const OuterLayout = styled.View`
  align-items: flex-start;
`;

type StyledPillProps = Pick<PillProps, "variant" | "color" | "checked">;

const PillContainer = styled.TouchableOpacity<StyledPillProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.radius.circle};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};

  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.grey[900] : "transparent"};
  border: 1px solid
    ${({ theme, variant, checked }) =>
      variant === "default"
        ? "transparent"
        : checked
        ? "transparent"
        : theme.colors.grey[900]};
`;

const StyledText = styled(Text)<StyledPillProps>`
  color: ${({ variant, color, theme, checked }) =>
    variant === "default"
      ? theme.colors.grey[900]
      : checked
      ? theme.colors.white[600]
      : getColors(color as Colors)};
`;
