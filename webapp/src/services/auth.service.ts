import axios from "axios";
import { User } from "../models/user";
import { ErrorResponse, requestAxios } from "./requestApi";

export type Token = {
  token: string
}

export type LoginType = {
  emailOrUsername: FormDataEntryValue;
  password: FormDataEntryValue;
}

export type SignUpType = {
  username: FormDataEntryValue,
  firstname: FormDataEntryValue,
  lastname: FormDataEntryValue,
  email: FormDataEntryValue,
  birthday: Date,
  password: FormDataEntryValue
}

export async function signup(params: SignUpType) {
  const response: Token | ErrorResponse = await requestAxios("POST", "/auth/signup", params );
  return response;
}

export async function login(params: LoginType): Promise<Token | ErrorResponse> {
  const response: Token | ErrorResponse = await requestAxios("POST", "/auth/login", params );
  return response;
}

export async function getCurrentUser(): Promise<User | ErrorResponse> {
  const response: User | ErrorResponse = await requestAxios("GET", "/auth/connected");
  return response;
}