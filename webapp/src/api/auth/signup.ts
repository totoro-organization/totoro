import { Response, SignUpData } from 'src/models';
import { requestAxios } from '../requestAxios';
import { API_ROUTES } from '../routes';

export async function signup(params: SignUpData): Promise<Response> {
  const response: Response = await requestAxios(
    'POST',
    `${API_ROUTES.AUTH}/signup`,
    params
  );
  return response;
}
