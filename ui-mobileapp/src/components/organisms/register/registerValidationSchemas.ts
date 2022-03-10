import * as Yup from "yup";
import {
  REQUIRED_MSG,
  EMAIL_VALID_MSG,
  TOO_SHORT_STRING_MSG,
  PASSWORD_DONT_MATCH_MSG,
} from "../../../common/forms/validationConstants";

export type RegisterStepOneFormValues = Yup.InferType<
  typeof registerStepOneSchema
>;

export const registerStepOneSchema = Yup.object({
  email: Yup.string().email(EMAIL_VALID_MSG).required(REQUIRED_MSG).trim(),
  password: Yup.string().min(6, TOO_SHORT_STRING_MSG).required(REQUIRED_MSG),
  confirmPassword: Yup.string()
    .required(REQUIRED_MSG)
    .oneOf([Yup.ref("password")], PASSWORD_DONT_MATCH_MSG),
}).required();
