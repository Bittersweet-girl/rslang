import axios from 'axios';

interface UserData {
  name: string;
  email: string;
  password: string;
}

// interface UserDataResp {
//   id: string;
//   name: string;
//   email: string;
// }

export interface UserSigninResp {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

interface AxiosResp {
  data: UserSigninResp;
}

function getErrorMessage(data: Pick<AxiosResp, 'data'>): string {
  let message = 'Something went wrong';
  if (typeof data === 'string') {
    message = data;
  }
  // @todo declare type for data
  /* @ts-ignore */
  if (data?.error?.errors[0]?.message) {
  /* @ts-ignore */
    message = data?.error?.errors[0]?.message;
  }
  return message;
}

export function create({ name, email, password }: UserData): Promise<AxiosResp> {
  return axios
    .post('https://rslang-database.herokuapp.com/users', { name, email, password })
    .catch(({ response }) => Promise.reject(getErrorMessage(response.data)));
}

export function signin({ email, password }:Pick<UserData, 'email' | 'password'>): Promise<AxiosResp> {
  return axios
    .post('https://rslang-database.herokuapp.com/signin', { email, password })
    .catch(({ response }) => Promise.reject(getErrorMessage(response.data)));
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem('user');
    if (typeof user === 'string') {
      return JSON.parse(user);
    }
    return null;
  } catch {
    return null;
  }
}
