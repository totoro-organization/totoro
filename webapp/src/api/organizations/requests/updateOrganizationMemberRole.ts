import { requestAxios } from 'src/api/requestAxios';
import { API_ROUTES } from 'src/api/routes';

export async function updateOrganizationMember(memberId: string, data: object) {
  const response = await requestAxios(
    'PUT',
    API_ROUTES.ORGANIZATION_UPDATE_MEMBER(memberId),
    data
  );
  return response;
}
