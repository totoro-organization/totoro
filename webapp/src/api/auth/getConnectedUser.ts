import { Response, User } from 'src/models';
import { requestAxios } from '../requestAxios';
import { API_ROUTES } from '../routes';

export async function getConnectedUser(): Promise<User | Response> {
  const response: User | Response = await requestAxios(
    'GET',
    API_ROUTES.AUTH_CONNECTED
  );
  return response;
}
