import axios from "axios";
import { User } from "../models/user";
import { requestAxios } from "./requestApi";


export async function login(params: {
    emailOrUsername: FormDataEntryValue;
    password: FormDataEntryValue;
  }): Promise<any> {
  const response = await requestAxios("POST", "/auth/login/admin", params );
  return response;
}

export async function logout() {
  const response = await axios.delete("/api/admin");
  return response;
}

export async function getCurrentUser() {
  const response = await requestAxios("GET", "/auth/connected");
  return response;
}