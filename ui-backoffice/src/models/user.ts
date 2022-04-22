import { Job } from "./admin";
import { Status } from "./status";

export type UserStatus = Status<'outlawed' | 'freezed' | 'active' | 'inactive'>;

export interface User {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    jobs: Job[],
    tokens: number,
    birthday?: Date,
    avatar?: string,
    phone?: number,
    status: UserStatus
}
