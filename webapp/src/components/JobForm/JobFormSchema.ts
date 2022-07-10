import * as Yup from "yup";
import { EMAIL_VALID_MSG, REQUIRED_MSG } from "../forms/validationConstants";

export type JobFormFieldTypes = Yup.InferType<
  typeof JobFormSchema
>;

export const JobFormSchema = Yup.object({
  title: Yup.string().min(3).required(REQUIRED_MSG).trim(),
  tags: Yup.array().of(Yup.object()).min(1).required(REQUIRED_MSG),
  category: Yup.object().required(REQUIRED_MSG),
  difficulty: Yup.string().required(REQUIRED_MSG),
  nb_participants: Yup.number().min(1),
  description: Yup.string().min(100).required(REQUIRED_MSG),
  start_date: Yup.date().required(REQUIRED_MSG),
  end_date: Yup.date().required(REQUIRED_MSG)
}).required(REQUIRED_MSG);