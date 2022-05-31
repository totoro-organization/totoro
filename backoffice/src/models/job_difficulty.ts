import { Status, StatusEnum } from "./status";

export type JobDifficultyStatus = Status<StatusEnum.actived | StatusEnum.deleted>;

export interface JobDifficulty {
    id: string,
    level: number,
    token: number,
    status: JobDifficultyStatus,
    createdAt: string,
    updatedAt: string
}