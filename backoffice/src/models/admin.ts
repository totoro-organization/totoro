import { Role } from "./role";
import { Status, StatusEnum } from "./status";

export type AdminStatus = Status<StatusEnum.actived | StatusEnum.disabled  | StatusEnum.freezed >;

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


