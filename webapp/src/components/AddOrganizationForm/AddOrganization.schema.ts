import * as Yup from 'yup';
import { REQUIRED_MSG } from 'src/components/forms/validationConstants';

export const AddOrganizationSchema = Yup.object({
  phone: Yup.number().min(10).max(10).required(REQUIRED_MSG),
  type: Yup.string().oneOf(['siret', 'siren']),
  typeValue: Yup.string().required(REQUIRED_MSG),
  email: Yup.string().email().required(REQUIRED_MSG).trim(),
}).required(REQUIRED_MSG);
