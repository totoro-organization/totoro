import { CommonStatusEnum } from "./commons";
import { Status } from "./status";

export type JobDifficultyStatus = Status<keyof typeof CommonStatusEnum>;

export interface JobDifficulty {
    id: string,
    level: number,
    token: number,
    status: JobDifficultyStatus,
    createdAt: string,
    updatedAt: string
}