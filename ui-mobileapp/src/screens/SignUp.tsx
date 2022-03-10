import React, { useState } from "react";

import { Text } from "react-native";

import MainLayout from "../components/layouts/MainLayout";
import RegisterStepOne from "../components/organisms/register/RegisterStepOne";

// TODO: Find a better naming for these steps?
enum RegisterSteps {
  STEP_ONE = "StepOne",
  STEP_TWO = "StepTwo",
  STEP_FINAL = "StepFinal",
}

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(RegisterSteps.STEP_ONE);

  return (
    <MainLayout>
      <Text>S'inscrire</Text>

      {currentStep === RegisterSteps.STEP_ONE && (
        <RegisterStepOne
          nextStep={() => setCurrentStep(RegisterSteps.STEP_TWO)}
        />
      )}
    </MainLayout>
  );
}
