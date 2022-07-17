import * as Yup from 'yup';
import { REQUIRED_MSG } from 'src/components/forms/validationConstants';

export const ResetPasswordSchema = Yup.object({
  password: Yup.string().required(REQUIRED_MSG),
  passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Les mot de passe doivent être identiques')
}).required(REQUIRED_MSG);
