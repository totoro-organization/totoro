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
    username: FormDataEntryValue,
    firstname: FormDataEntryValue,
    lastname: FormDataEntryValue,
    email: FormDataEntryValue,
    birthday: Date,
    password: FormDataEntryValue
}
  

