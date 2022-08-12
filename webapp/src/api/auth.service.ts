import { LoginData, SignUpData, User, Response } from "src/models";
import { ForgotPasswordData } from "src/models/services";
import { requestAxios } from "./requestAxios";
import { API_ROUTES } from "./routes";

export async function signup(params: SignUpData) {
  const response: Response = await requestAxios("POST", `${API_ROUTES.AUTH}/signup`, params );
  return response;
}

export async function login(params: LoginData): Promise<Response> {
  const response: Response = await requestAxios("POST", `${API_ROUTES.AUTH}/login`, params );
  return response;
}

export async function getCurrentUser(): Promise<User | Response> {
  const response: User | Response = await requestAxios("GET", `${API_ROUTES.AUTH}/connected`);
  return response;
}

export async function forgotPassword(data: ForgotPasswordData): Promise<Response> {
  const response: Response = await requestAxios("POST", `${API_ROUTES.AUTH}/forgot`, data );
  return response;
}