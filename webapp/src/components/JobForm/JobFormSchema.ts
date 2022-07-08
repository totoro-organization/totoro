import * as Yup from "yup";
import { EMAIL_VALID_MSG, REQUIRED_MSG } from "../forms/validationConstants";

export type JobFormData = Yup.InferType<
  typeof JobFormSchema
>;

export const JobFormSchema = Yup.object({
  title: Yup.string().min(3).trim(),
  tags: Yup.array().of(Yup.object()).min(1),
  category: Yup.object(),
  difficulty: Yup.string()
}).required(REQUIRED_MSG);