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
  

