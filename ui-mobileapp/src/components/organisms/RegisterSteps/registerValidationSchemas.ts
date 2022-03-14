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

export type RegisterStepTwoFormValues = Yup.InferType<
  typeof registerStepTwoSchema
>;

export const registerStepTwoSchema = Yup.object({
  firstName: Yup.string().required(REQUIRED_MSG),
  lastName: Yup.string().required(REQUIRED_MSG),
  // TODO: fix validation
  birthDate: Yup.string().required(REQUIRED_MSG),
  // TODO: fix validation
  phoneNumber: Yup.string().required(REQUIRED_MSG),
}).required();

export type RegisterStepFinalFormValues = Yup.InferType<
  typeof registerStepFinalSchema
>;

export const registerStepFinalSchema = Yup.object({
  address: Yup.string().required(REQUIRED_MSG),
}).required();
