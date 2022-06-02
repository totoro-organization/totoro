import { Role } from "./role";
import { Status } from "./status";

export type AdminStatus = Status<'completed' | 'pending' | 'coming'>;

export interface Admin {
    id: string,
    status: AdminStatus,
    role: Role,
    firsname: string,
    lastname: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string
}


