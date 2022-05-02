import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import styled from "styled-components/native";
import Button from "../components/atoms/Button";
import ProgressBar from "../components/atoms/ProgressBar";
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
  const [currentStep, setCurrentStep] = useState<RegisterSteps>(
    RegisterSteps.STEP_TWO
  );
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  const totalSteps = Object.values(RegisterSteps).length;
  const currentStepNumber =
    Object.values(RegisterSteps).indexOf(currentStep) + 1;

  function getStepTitle(currentStep: RegisterSteps) {
    switch (currentStep) {
      case RegisterSteps.STEP_ONE:
        return "Création du compte";
      case RegisterSteps.STEP_TWO:
        return "Vos informations personnelles";
      case RegisterSteps.STEP_FINAL:
        return "C'est bientôt fini !";
    }
  }

  return (
    <MainLayout withBackButton>
      <Heading variant="h1">Inscription&nbsp;👋</Heading>

      <Spacer axis="vertical" size={3} />

      <ProgressBar
        title={getStepTitle(currentStep)}
        totalNumberOfSteps={totalSteps}
        currentStepNumber={currentStepNumber}
      />

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
