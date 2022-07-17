import * as Yup from 'yup';
import { REQUIRED_MSG } from 'src/components/forms/validationConstants';

export const SigninSchema = Yup.object({
  emailOrUsername: Yup.string().min(2).required(REQUIRED_MSG).trim(),
  password: Yup.string().min(6).required(REQUIRED_MSG).trim(),
}).required(REQUIRED_MSG);
