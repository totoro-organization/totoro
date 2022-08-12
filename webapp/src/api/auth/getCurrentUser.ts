import { Response, User } from 'src/models';
import { requestAxios } from '../requestAxios';
import { API_ROUTES } from '../routes';

export async function getCurrentUser(): Promise<User | Response> {
  const response: User | Response = await requestAxios(
    'GET',
    `${API_ROUTES.AUTH}/connected`
  );
  return response;
}
