export type Token = string;

export interface Response {
    error?: boolean
    message: string,
    status_code: number,
    entity?: string,
    token?: Token
}
  
export interface LoginData {
    emailOrUsername: string;
    password: string;
}

export interface SignUpData {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    birthday: string,
    password: string
}

export interface ResetPasswordData {
    token: Token,
    password: string
}

export interface ForgotPasswordData {
    email: string,
}

export interface AddOrganizationData {
    siret: string,
    email: string,
    phone: number
}

