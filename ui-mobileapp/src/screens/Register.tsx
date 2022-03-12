import React, { useState } from "react";

import { Text } from "react-native";

import MainLayout from "../components/layouts/MainLayout";
import RegisterStepFinal from "../components/organisms/RegisterSteps/RegisterStepFinal";
import RegisterStepOne from "../components/organisms/RegisterSteps/RegisterStepOne";
import RegisterStepTwo from "../components/organisms/RegisterSteps/RegisterStepTwo";

// TODO: Find a better naming for these steps?
enum RegisterSteps {
  STEP_ONE = "StepOne",
  STEP_TWO = "StepTwo",
  STEP_FINAL = "StepFinal",
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(RegisterSteps.STEP_ONE);

  return (
    <MainLayout>
      <Text>S'inscrire</Text>

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
    </MainLayout>
  );
}
