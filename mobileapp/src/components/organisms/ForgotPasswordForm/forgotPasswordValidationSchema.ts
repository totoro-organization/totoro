import * as Yup from "yup";
import {
  EMAIL_VALID_MSG,
  REQUIRED_MSG,
  TOO_SHORT_STRING_MSG,
} from "../../../common/forms/validationConstants";

export type ForgotPasswordFormValues = Yup.InferType<
  typeof forgotPasswordFormSchema
>;

export const forgotPasswordFormSchema = Yup.object({
  email: Yup.string().email(EMAIL_VALID_MSG).required(REQUIRED_MSG).trim(),
}).required();
