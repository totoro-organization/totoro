import { Organization } from "./organization";
import { Partner } from "./partner";
import { Role } from "./role";
import { MembershipStatus, UserStatus } from "./status";

export interface Membership {
  id: string;
  organization: Organization;
  role: Role;
  status: MembershipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone?: number;
  bio?: string;
  total_token: number;
  birthday?: Date;
  avatar: string;
  status: UserStatus;
  memberships: Membership[];
  partners: Partner[];
  createdAt: string;
  updatedAt: string;
}
