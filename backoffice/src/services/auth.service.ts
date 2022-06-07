import axios from "axios";
import { User } from "../models/user";
import { ErrorResponse, requestAxios } from "./requestApi";

export const AUTH_BASE_URL = "/auth";

export interface Token {
  token: string
}

export interface LoginType {
  emailOrUsername: FormDataEntryValue;
  password: FormDataEntryValue;
}

export async function login(params: LoginType): Promise<Token | ErrorResponse> {
  const response: Token | ErrorResponse = await requestAxios("POST", `${AUTH_BASE_URL}/login/admin`, params );
  return response;
}

export async function getCurrentUser(): Promise<User | ErrorResponse> {
  const response: User | ErrorResponse = await requestAxios("GET", `${AUTH_BASE_URL}/connected`);
  return response;
}