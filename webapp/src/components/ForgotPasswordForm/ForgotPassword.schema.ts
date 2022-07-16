import * as Yup from 'yup';
import { REQUIRED_MSG } from 'src/components/forms/validationConstants';

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email().required(REQUIRED_MSG).trim(),
}).required(REQUIRED_MSG);
