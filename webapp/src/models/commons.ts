import { DiscountType } from "./discount_type";
import { JobDifficulty } from "./job_difficulty";
import { LitigationObject } from "./litigation_object";
import { Pricing } from "./pricing";
import { Role } from "./role";
import { Status, StatusEnum } from "./status";
import { Tag } from "./tag";

export enum CommonsUriEnum {
    status = "/status",
    roles = "/roles",
    tags = "/tags",
    difficulties = "/difficulties",
    litigationObjects = "/litigation-objects",
    discountTypes = "/types-discounts",
    appearances = "/appearances",
    pricings = "/pricings"
}

export enum CommonStatusEnum {
    actived = StatusEnum.actived,
    deleted = StatusEnum.deleted
}

export type Commons = 
    Status<any>      |
    Role             |
    Tag              |
    JobDifficulty    |
    LitigationObject |
    DiscountType     |
    Pricing        