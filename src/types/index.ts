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
export interface INewTokens {
  data: {
    token: string;
    refreshToken: string;
  }
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
  currentPage: number;
}

// --------------------sprine-game types---------------------

export interface UserWord {
  difficulty: string;
  id: string;
  optional: OptionalData;
  wordId: string;
}

interface GameResult {
  correctRow: number;
  correct: number;
  // right: number;
  wrong: number;
}

interface OptionalData {
  sprint?: GameResult;
  audio?: GameResult;
}

export interface NewUserWord {
  difficulty: string;
  optional?: OptionalData;
}

export interface PreparedWords extends CombinedWordsData {
  isCorrect?: boolean;
  isCorrectAnswer?: boolean;
  isCorrectAnswerAudio?: boolean;
  fakeTranslation?: string;
  isInGame?: boolean;
}

export interface CombinedWords {
  words: IProduct[];
  userWords: UserWord[];
}

export interface CombinedWordsData extends IProduct {
  meta?: UserWord;
}

export interface GetWordsParam {
  group: number;
  page: number;
}

export interface MakeGameWordsParam extends GetWordsParam {
  filterLearned: boolean;
  amount: number;
}

export interface CreateUserWordParam {
  wordId: string;
  wordData: NewUserWord;
  usePut: boolean;
}

export interface TimerParam {
  time: number;
  onTimeUp: ()=>void;
}

export interface GameWords {
  words: IProduct[];
}

export interface GameState {
  countCorrect: number;
  correctRow: number;
  total: number;
  countBonus: number;
  bonusRatio: number;
  countWrong: number;
  score: number;
  index: number;
  words: PreparedWords[],
  initialWords: PreparedWords[],
  isGameOver: boolean;
  isGameStarted: boolean;
}

export interface SprintGameParam {
  state: GameState;
  setState: React.Dispatch<any>;
}

export interface GameWord {
  word: IProduct;
}

export interface SaveStatisticParam {
  game: string;
  correct: number;
  wrong: number;
  correctRow: number;
  newWords: number;
  learned: number;
}

// --------Audio Game ----------

export interface AudioGameState {
  isAnswer: boolean;
  isCorrect: boolean;
  countCorrect: number;
  countWrong: number;
  correctRow: number;
  index: number;
  words: PreparedWords[],
  answers: string[],
  isGameOver: boolean;
  isGameStarted: boolean;
  group: number;
}

export interface AudioGameParam {
  state: AudioGameState;
  setState: React.Dispatch<any>;
}