import { Job } from "./job";
import { User } from "./user";

export interface Chat {
    id: string,
    job: Job,
    recipient: User,
    sender: User,
    message: string,
    attachments?: AttachmentChat[],
    createdAt: string,
    updatedAt: string
}

export interface AttachmentChat {
    id: string,
    original_name: string,
    type: string,
    attachment: string,
    createdAt: string,
    updatedAt: string
}