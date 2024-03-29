import { requestAxios } from 'src/api/requestAxios';
import { API_ROUTES } from 'src/api/routes';

export async function requestOrganization(id: string) {
  const response = await requestAxios(
    'POST',
    API_ROUTES.REQUEST_ORGANIZATION(id),
  );
  return response;
}
