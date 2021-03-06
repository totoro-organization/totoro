import { Job } from "./job";
import { OrganizationStatus } from "./status";
import { User } from "./user";

export interface Organization {
  id: string;
  name: string;
  email?: string;
  address?: string;
  cp?: number;
  commune?: string;
  logo: string;
  description?: string;
  link?: string;
  phone?: string;
  siren: number;
  siret: number;
  longitude: number;
  latitude: number;
  status: OrganizationStatus;
  creation_date?: string;
  activity?: string;
  users: User[];
  jobs: Job[];
  createdAt: string;
  updatedAt: string;
}
