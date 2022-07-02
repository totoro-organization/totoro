import { Organization } from "./organization";
import {
  JobDifficultyStatus,
  JobStatus,
  Status,
  SubscriptionStatus,
} from "./status";
import { User } from "./user";

export interface Job {
  id: string;
  title: string;
  organization: Organization;
  difficulty: JobDifficulty;
  participants: User[];
  participants_max: number;
  remaining_place: number;
  latitude: number;
  longitude: number;
  address: string;
  isExpired: boolean;
  author: Author;
  cp: number;
  commune: string;
  description?: string;
  start_date: string;
  end_date: string;
  tags: Tag[];
  attachments: AttachmentJob[];
  qrcode: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface JobFavorite {
  id: string;
  jobs_id: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Tag {
  id: string;
  tag: {
    label: string;
    type: "mission" | "category";
    status: SubscriptionStatus;
    createdAt: string;
    updatedAt: string;
  };
}

export interface AttachmentJob {
  id: string;
  original_name: string;
  type: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobDifficulty {
  id: string;
  level: number;
  token: number;
  status: JobDifficultyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: string;
  organization: Organization;
  user: User;
  status: Status<any>;
}
