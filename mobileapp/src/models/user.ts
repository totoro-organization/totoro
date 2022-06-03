import { Organization } from "./organization";
import { Role } from "./role";
import { Status } from "./status";

export type UserStatus = Status<"actived" | "freezed" | "disabled">;

export interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phone?: number;
  adress?: any; // FIXME
  latitude?: any; // REMOVE ME => see with backend guys
  longitude?: any; // REMOVE ME => see with backend guys
  bio?: string;
  total_token: number;
  birthday?: any;
  avatar?: string;
  status?: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}
