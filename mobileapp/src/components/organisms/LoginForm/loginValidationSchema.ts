import * as Yup from "yup";
import {
  EMAIL_VALID_MSG,
  REQUIRED_MSG,
  TOO_SHORT_STRING_MSG,
} from "../../../common/forms/validationConstants";

export type LoginFormValues = Yup.InferType<typeof loginFormSchema>;

export const loginFormSchema = Yup.object({
  email: Yup.string().email(EMAIL_VALID_MSG).required(REQUIRED_MSG).trim(),
  password: Yup.string().min(6, TOO_SHORT_STRING_MSG).required(REQUIRED_MSG),
}).required();
