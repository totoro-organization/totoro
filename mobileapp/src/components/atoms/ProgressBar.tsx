import React from "react";
import styled from "styled-components/native";
import Spacer from "./Spacer";
import { Text } from "./Text";

export type ProgressBarProps = {
  totalNumberOfSteps: number;
  currentStepNumber: number;
  title: string;
};

export default function ProgressBar({
  totalNumberOfSteps,
  currentStepNumber,
  title,
}: ProgressBarProps) {
  const progressValue = (currentStepNumber / totalNumberOfSteps) * 100;

  return (
    <>
      <Text>
        {`${currentStepNumber} / ${totalNumberOfSteps}`} - {title}
      </Text>

      <Spacer axis="vertical" size={0.5} />

      <ProgressBarContainer accessibilityRole="progressbar">
        <Progress progressValue={progressValue} />
      </ProgressBarContainer>
    </>
  );
}

// TODO: Add progress animation.
const ProgressBarContainer = styled.View`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.v1.grey[200]};
  border-radius: ${({ theme }) => theme.border.radius.md};
`;

const Progress = styled.View<{ progressValue: number }>`
  position: absolute;
  width: ${({ progressValue }) => progressValue && `${progressValue}%`};
  height: 4px;
  background-color: ${({ theme }) => theme.colors.core.black.base};
  border-radius: ${({ theme }) => theme.border.radius.md};
`;
