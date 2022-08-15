import { requestAxios } from 'src/api/requestAxios';
import { API_ROUTES } from 'src/api/routes';

export async function updateOrganizationBanner(id: string, data: object) {
  const response = await requestAxios(
    'PUT',
    API_ROUTES.ORGANIZATION_UPDATE_BANNER(id),
    data
  );
  return response;
}
