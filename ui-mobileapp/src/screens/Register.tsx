import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import styled from "styled-components/native";
import Button from "../components/atoms/Button";
import Spacer from "../components/atoms/Spacer";

import { Heading } from "../components/atoms/Text";

import MainLayout from "../components/layouts/MainLayout";
import RegisterStepFinal from "../components/organisms/RegisterSteps/RegisterStepFinal";
import RegisterStepOne from "../components/organisms/RegisterSteps/RegisterStepOne";
import RegisterStepTwo from "../components/organisms/RegisterSteps/RegisterStepTwo";
import { AuthParamList } from "../navigation/StackNavigationParams";

enum RegisterSteps {
  STEP_ONE = "StepOne",
  STEP_TWO = "StepTwo",
  STEP_FINAL = "StepFinal",
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(RegisterSteps.STEP_ONE);
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <MainLayout>
      <Heading variant="h1">Inscription&nbsp;👋</Heading>

      <StepWrapper>
        {currentStep === RegisterSteps.STEP_ONE && (
          <RegisterStepOne
            nextStep={() => setCurrentStep(RegisterSteps.STEP_TWO)}
          />
        )}

        {currentStep === RegisterSteps.STEP_TWO && (
          <RegisterStepTwo
            nextStep={() => setCurrentStep(RegisterSteps.STEP_FINAL)}
          />
        )}

        {currentStep === RegisterSteps.STEP_FINAL && <RegisterStepFinal />}

        <Spacer axis="vertical" size={0.5} />

        <Button
          variant="ghost"
          color="black"
          onPress={() => navigation.navigate("Se connecter")}
        >
          J'ai déjà un compte
        </Button>
      </StepWrapper>
    </MainLayout>
  );
}

const StepWrapper = styled.View`
  margin-top: ${({ theme }) => theme.spacing[12]};
`;
