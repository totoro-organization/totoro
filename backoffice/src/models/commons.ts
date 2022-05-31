import { DiscountType } from "./discount_type";
import { JobDifficulty } from "./job_difficulty";
import { LitigationObject } from "./litigation_object";
import { Pricing } from "./pricing";
import { Role } from "./role";
import { Status } from "./status";
import { Tag } from "./tag";

export enum CommonsEnum {
    status = "status",
    roles = "roles",
    tags = "tags",
    difficulties = "difficulties",
    litigationObjects = "litigation-objects",
    discountType = "types-discounts",
    appearances = "appearances",
    pricings = "pricings"
}

export type Commons = 
    Status<any>      |
    Role             |
    Tag              |
    JobDifficulty    |
    LitigationObject |
    DiscountType     |
    Pricing        