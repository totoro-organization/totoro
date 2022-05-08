import axios from "axios";
import { Status } from "../models/status";
import { User } from "../models/user";
import { requestAxios } from "./requestApi";
export async function getCurrentUser(): Promise<User> {
  const response = await axios.get("/api/users");

  return response.data;
}

// export async function getUsers(): Promise<any> {
//     const data = await requestAxios("GET", '/commons/status');
//     return data;
// }

export function getUsers(): string {
  const url = '/commons/status';
  return url;
}
