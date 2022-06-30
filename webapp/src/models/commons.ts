import { DiscountType } from "./discount";
import { JobDifficulty, Tag } from "./job";
import { LitigationObject } from "./litigation";
import { Pricing } from "./pricing";
import { Role } from "./role";
import { Status } from "./status";

export type Commons = 
    Status<any>      |
    Role             |
    Tag              |
    JobDifficulty    |
    LitigationObject |
    DiscountType     |
    Pricing        