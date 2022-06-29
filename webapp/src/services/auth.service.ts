import { BaseUrlEnum, LoginData, SignUpData, Token, User, ErrorResponse } from "src/models";
import { requestAxios } from "./requestApi";

export async function signup(params: SignUpData) {
  const response: Token | ErrorResponse = await requestAxios("POST", `${BaseUrlEnum.AUTH}/signup`, params );
  return response;
}

export async function login(params: LoginData): Promise<Token | ErrorResponse> {
  const response: Token | ErrorResponse = await requestAxios("POST", `${BaseUrlEnum.AUTH}/login`, params );
  return response;
}

export async function getCurrentUser(): Promise<User | ErrorResponse> {
  const response: User | ErrorResponse = await requestAxios("GET", `${BaseUrlEnum.AUTH}/connected`);
  return response;
}