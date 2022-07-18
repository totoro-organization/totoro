import { ApplicationStatus, Status } from "./status";

export interface Application {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    status: Status<keyof typeof ApplicationStatus>
}