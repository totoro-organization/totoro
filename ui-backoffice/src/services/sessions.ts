import axios from "axios";
import { User } from "../models/user";
export async function login(params: {
    email: string;
    password: string;
  }): Promise<User> {
    const response = await axios.post("/api/admin", { session: params });
  
    return response.data.data;
  }
  
  export async function logout() {
    const response = await axios.delete("/api/admin");
  
    return response.data.data;
  }