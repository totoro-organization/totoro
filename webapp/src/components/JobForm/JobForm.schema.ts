import * as Yup from 'yup';
import { REQUIRED_MSG } from '../forms/validationConstants';

export const JobFormSchema = Yup.object({
  title: Yup.string().min(3).required(REQUIRED_MSG).trim(),
  tags: Yup.array().of(Yup.object()).min(1),
  category: Yup.object().required(REQUIRED_MSG),
  difficulty: Yup.string().required(REQUIRED_MSG),
  nb_participants: Yup.number().min(1),
  description: Yup.string().min(50).required(REQUIRED_MSG),
  start_date: Yup.string().required(REQUIRED_MSG),
  end_date: Yup.string().required(REQUIRED_MSG),
  images: Yup.mixed().required(REQUIRED_MSG)
}).required(REQUIRED_MSG);
