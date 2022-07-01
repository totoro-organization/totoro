import { LoginData, SignUpData, Token, User, ErrorResponse } from "src/models";
import { requestAxios } from "./requestApi";
import { API_ROUTES } from "./routes";

export async function signup(params: SignUpData) {
  const response: Token | ErrorResponse = await requestAxios("POST", `${API_ROUTES.AUTH}/signup`, params );
  return response;
}

export async function login(params: LoginData): Promise<Token | ErrorResponse> {
  const response: Token | ErrorResponse = await requestAxios("POST", `${API_ROUTES.AUTH}/login`, params );
  return response;
}

export async function getCurrentUser(): Promise<User | ErrorResponse> {
  const response: User | ErrorResponse = await requestAxios("GET", `${API_ROUTES.AUTH}/connected`);
  return response;
}