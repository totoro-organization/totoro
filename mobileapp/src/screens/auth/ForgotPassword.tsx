import React, { useState } from "react";
import SimpleLayout from "../../components/layouts/SimpleLayout";

import ForgotPasswordForm from "../../components/organisms/ForgotPasswordForm/ForgotPasswordForm";
import SuccessMessage from "../../components/organisms/ForgotPasswordForm/SuccessMessage";

enum ForgotPasswordStep {
  FORM = "form",
  SUCCESS = "success",
}

export default function ForgotPassword() {
  const [step, setStep] = useState<ForgotPasswordStep>(ForgotPasswordStep.FORM);
  return (
    <SimpleLayout>
      {step === ForgotPasswordStep.FORM && (
        <ForgotPasswordForm
          nextStep={() => setStep(ForgotPasswordStep.SUCCESS)}
        />
      )}

      {step === ForgotPasswordStep.SUCCESS && <SuccessMessage />}
    </SimpleLayout>
  );
}
