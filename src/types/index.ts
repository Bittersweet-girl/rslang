import React from 'react';
import NAVIGATE from '../constants/actionTypes';

export interface IHeaderProps {
  onLoginClick: React.MouseEventHandler<HTMLButtonElement>;
  signout: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IProduct {
  _id: string,
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

export interface IWordCard {
  product: IProduct;
  isActive: boolean;
  handleClick: (id: string) => void;
  isHard: boolean;
  diffCards: (id: string) => void;
  isLearn: boolean;
  learnCards: (id: string) => void;
}

export interface IPaginate {
  itemsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  forcePage: number;
}

export interface IUserWords {
  difficulty: string;
  id: string;
  wordId: string;
}

export interface IDictMenu {
  group: number;
  changeGroup: (gr: number) => void;
}

// --------------------login interfaces---------------------

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface UserSigninResp {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface AxiosResp {
  data: UserSigninResp;
}

// --------------------app-reducer types---------------------

export interface State {
  navigation?: NavState;
}

export interface NavState {
  page: string;
  pageProps: {};
}

export interface ActionNavigate {
  type: typeof NAVIGATE;
  payload: NavState;
}

export interface AppContextParam {
  state: State;
  dispatch: React.Dispatch<any>;
}

export interface GameProps {
  group: number;
  groupPage: number;
}
