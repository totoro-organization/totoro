import axios from "axios";
import { User } from "../models/user";
import { ErrorResponse, requestAxios } from "./requestApi";

export interface Token {
  token: string
}

export interface LoginType {
  emailOrUsername: FormDataEntryValue;
  password: FormDataEntryValue;
}

export async function login(params: LoginType): Promise<Token | ErrorResponse> {
  const response: Token | ErrorResponse = await requestAxios("POST", "/auth/login/admin", params );
  return response;
}

export async function logout() {
  const response = await axios.delete("/api/admin");
  return response;
}

export async function getCurrentUser(): Promise<User | ErrorResponse> {
  const response: User | ErrorResponse = await requestAxios("GET", "/auth/connected");
  return response;
}