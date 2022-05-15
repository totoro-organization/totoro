import axios from "axios";
import { User } from "../models/user";
import { requestAxios } from "./requestApi";


export async function login(params: {
    emailOrUsername: FormDataEntryValue;
    password: FormDataEntryValue;
  }): Promise<User> {
    const response = await requestAxios("POST", "/auth/login/admin", params );
  
    return response.data.token;
  }

  export async function logout() {
    const response = await axios.delete("/api/admin");
    
    return response.data.data;
  }