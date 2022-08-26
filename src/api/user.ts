import axios from 'axios';
import { UserData, AxiosResp } from '../types';

function getErrorMessage(status: number): string {
  let message = 'Что-то пошло не так, проверьте свои данные!';

  if (status === 404) {
    message = 'E-mail не найден, может нужно зарегистрироваться?';
  }

  if (status === 403) {
    message = 'Неправильный e-mail или пароль!';
  }

  if (status === 417) {
    message = 'Пользователь с таким e-mail уже существует!';
  }

  if (status === 422) {
    message = 'Некорректный e-mail или пароль!';
  }

  return message;
}

export function create({ name, email, password }: UserData): Promise<AxiosResp> {
  return axios
    .post('https://rslang-database.herokuapp.com/users', { name, email, password })
    .catch(({ response }) => Promise.reject(getErrorMessage(response.status)));
}

export function signin({ email, password }:Pick<UserData, 'email' | 'password'>): Promise<AxiosResp> {
  return axios
    .post('https://rslang-database.herokuapp.com/signin', { email, password })
    .catch(({ response }) => Promise.reject(getErrorMessage(response.status)));
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
