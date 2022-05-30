import { AttachmentJob } from "./attachment_job";
import { JobDifficulty } from "./job_difficulty";
import { Organization } from "./organization";
import { Status, StatusEnum } from "./status";
import { Tag } from "./tag";
import { User } from "./user";

export type JobStatus = Status<StatusEnum.actived | StatusEnum.disabled | StatusEnum.coming>;

export interface Job {
    id: string,
    title: string,
    organization: Organization,
    difficulty: JobDifficulty,
    participants: User[],
    participants_max: number,
    address: string,
    cp: number,
    commune: string,
    description?: string,
    start_date: string,
    end_date: string,
    tags: Tag[],
    attachments?: AttachmentJob[],
    status: JobStatus,
    createdAt: string,
    updatedAt: string
}
