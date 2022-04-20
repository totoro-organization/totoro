import { Status } from "./status";

export type UserStatus = 'completed' | 'pending' | 'coming';

export interface User {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    tokens: number,
    birthday?: Date,
    avatar?: string,
    phone?: number,
    status: Status<UserStatus>
}
