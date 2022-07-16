export type Token = string;

export interface Response {
    error?: boolean
    message: string,
    entity?: string,
    token?: Token
}
  
export interface LoginData {
    emailOrUsername: FormDataEntryValue;
    password: FormDataEntryValue;
}

export interface SignUpData {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    birthday: string,
    password: string
}
  

