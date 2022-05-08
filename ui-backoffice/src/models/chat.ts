import { AttachmentChat } from "./attachment_chat"
import { Job } from "./job"
import { User } from "./user"

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