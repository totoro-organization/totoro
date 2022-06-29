
export enum BaseUrlEnum {
    STATUS = "/status",
    ROLES = "/roles",
    TAGS = "/tags",
    DIFFICULTIES = "/difficulties",
    LITIGATION_OBJECTS = "/litigation-objects",
    DISCOUNT_TYPES = "/types-discounts",
    APPAEARANCES = "/appearances",
    PRICINGS = "/pricings",
    JOBS = "/jobs",
    SUBSCRIPTIONS = "/subscriptions",
    LITIGATIONS = "/litigations",
    ORGANIZATIONS = "/organizations",
    PARTNERS = "/partners",
    USERS = "/users",
    ADMIN = "/admin",
    FAVORITES = "/favorites",
    AUTH = "/auth"
}

export enum CommonsBaseUrlEnum {
    STATUS = "/status",
    ROLE = "/roles",
    TAGS = "/tags",
    DIFFICULTIES = "/difficulties",
    LITIGATION_OBJECTS = "/litigation-objects",
    DISCOUNT_TYPES = "/types-discounts",
    APPAEARANCES = "/appearances",
    PRICINGS = "/pricings"
}

export interface Token {
    token: string
}

export interface ErrorResponse {
    error: string
}
  
export interface LoginData {
    emailOrUsername: FormDataEntryValue;
    password: FormDataEntryValue;
}

export interface SignUpData {
    username: FormDataEntryValue,
    firstname: FormDataEntryValue,
    lastname: FormDataEntryValue,
    email: FormDataEntryValue,
    birthday: Date,
    password: FormDataEntryValue
}
  

