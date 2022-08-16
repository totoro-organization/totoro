import { LoginData, Response } from 'src/models';
import { requestAxios } from '../requestAxios';
import { API_ROUTES } from '../routes';

export async function login(params: LoginData): Promise<Response> {
  const response: Response = await requestAxios(
    'POST',
    `${API_ROUTES.AUTH}/login`,
    params
  );
  return response;
}
