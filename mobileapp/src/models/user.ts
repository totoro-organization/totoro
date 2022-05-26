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
  bio?: string;
  total_token?: number;
  birthday?: Date;
  avatar?: string;
  status?: UserStatus;
  memberships?: {
    organization?: Organization;
    role?: Role;
    createdAt?: string;
    updatedAt?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
