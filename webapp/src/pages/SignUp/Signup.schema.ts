import * as Yup from 'yup';
import { REQUIRED_MSG } from 'src/components/forms/validationConstants';

export const SignupSchema = Yup.object({
  firstname: Yup.string().min(2).required(REQUIRED_MSG).trim(),
  lastname: Yup.string().min(2).required(REQUIRED_MSG).trim(),
  username: Yup.string().min(2).required(REQUIRED_MSG).trim(),
  email: Yup.string().email().required(REQUIRED_MSG).trim(),
  password: Yup.string().min(8).required(REQUIRED_MSG).trim(),
  birthday: Yup.string().required(REQUIRED_MSG),
}).required(REQUIRED_MSG);
