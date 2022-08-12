import { ForgotPasswordData, Response } from 'src/models/services';
import { requestAxios } from '../requestAxios';
import { API_ROUTES } from '../routes';

export async function forgotPassword(
  data: ForgotPasswordData
): Promise<Response> {
  const response: Response = await requestAxios(
    'POST',
    `${API_ROUTES.AUTH}/forgot`,
    data
  );
  return response;
}
