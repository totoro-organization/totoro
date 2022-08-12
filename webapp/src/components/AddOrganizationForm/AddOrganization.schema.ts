import * as Yup from 'yup';
import { PHONE_VALID_MSG, REQUIRED_MSG, SIRET_VALID_MSG } from 'src/components/forms/validationConstants';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const siretRegExp = /\d{14}/g;

export const AddOrganizationSchema = Yup.object({
  phone: Yup.string().matches(phoneRegExp, PHONE_VALID_MSG).required(REQUIRED_MSG),
  siret: Yup.string().matches(siretRegExp, SIRET_VALID_MSG).required(REQUIRED_MSG),
  email: Yup.string().email().required(REQUIRED_MSG).trim(),
}).required(REQUIRED_MSG);
