import { Role } from "./role";
import { AdminStatus } from "./status";


export interface Admin {
    id: string,
    status: AdminStatus,
    role: Role,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string
}


