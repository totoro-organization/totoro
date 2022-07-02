import { Admin, ErrorResponse, LoginData, Token } from "src/models";
import { requestAxios } from "./requestApi";
import { API_ROUTES } from "./routes";

export async function login(params: LoginData): Promise<Token | ErrorResponse> {
  const response: Token | ErrorResponse = await requestAxios("POST", `${API_ROUTES.AUTH}/login/admin`, params );
  return response;
}

export async function getCurrentUser(): Promise<Admin | ErrorResponse> {
  const response: Admin | ErrorResponse = await requestAxios("GET", `${API_ROUTES.AUTH}/connected`);
  return response;
}