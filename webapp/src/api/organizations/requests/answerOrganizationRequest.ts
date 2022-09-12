import { requestAxios } from 'src/api/requestAxios';
import { API_ROUTES } from 'src/api/routes';

export async function answerOrganizationRequest(memberId: string, data: object) {
  const response = await requestAxios(
    'PUT',
    API_ROUTES.ORGANIZATION_ANSWER_REQUEST(memberId),
    data
  );
  return response;
}
