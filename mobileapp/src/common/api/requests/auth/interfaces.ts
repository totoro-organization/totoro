export interface LoginUser {
  emailOrUsername: string;
  password: string;
}

export interface User {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  birthday?: any;
  phone?: string;
}
