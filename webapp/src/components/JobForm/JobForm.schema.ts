import * as Yup from 'yup';
import { REQUIRED_MSG } from '../forms/validationConstants';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const JobFormSchema = Yup.object({
  title: Yup.string().min(3).required(REQUIRED_MSG).trim(),
  tags: Yup.array().of(Yup.object()).min(1),
  category: Yup.object().required(REQUIRED_MSG),
  difficulty: Yup.string().required(REQUIRED_MSG),
  nb_participants: Yup.number().min(1),
  description: Yup.string().min(50).required(REQUIRED_MSG),
  start_date: Yup.string().required(REQUIRED_MSG),
  end_date: Yup.string().required(REQUIRED_MSG),
  images: Yup.mixed()
    .required(REQUIRED_MSG)
    .test(
      'fileFormat',
      'Format non supporté',
      (value: any) => {
        let nbErrors = 0;
         [...value].forEach((file: File )=> {
            if(!SUPPORTED_FORMATS.includes(file.type)) nbErrors++
          });
          return nbErrors === 0;
      }
    )
}).required(REQUIRED_MSG);
