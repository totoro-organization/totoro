import { Admin, LoginData, Response } from "src/models";
import { requestAxios } from "./requestApi";
import { API_ROUTES } from "./routes";

export async function login(params: LoginData): Promise<Response> {
  const response: Response = await requestAxios("POST", `${API_ROUTES.AUTH}/login/admin`, params );
  return response;
}

export async function getCurrentUser(): Promise<Admin | Response> {
  const response: Admin | Response = await requestAxios("GET", `${API_ROUTES.AUTH}/connected`);
  return response;
}