import axios from 'axios';
import {
  CombinedWords,
  CombinedWordsData,
  CreateUserWordParam,
  GetWordsParam, IProduct,
  MakeGameWordsParam, UserWord,
} from '../types';
import { getCurrentUser } from './user';

const LEARNED = 'learned';

// если не залогиненый /words?group=1&page=1

// если залогиненый
// 1)  /words?group=1&page=1
// 2) /users/6305dbb8516d050016a47ec7/words
// 3) id - обший массив
// из меню - все слова пользователя
// из учебника - все кроме изученых

// после игры
// group, page, amount, withoutLearned

// get words
// getuserwords
// get combined array
// get filtered array by learned words
// call get wards while get requared amount of words

export default function getWords({ group, page }: GetWordsParam) {
  return axios.get(`https://rslang-database.herokuapp.com/words?page=${page}&group=${group}`)
    .then(({ data }) => data);
}

export function getUserWords() {
  const user = getCurrentUser();
  if (!user?.userId) {
    return Promise.resolve([]);
  }
  return axios.get(`https://rslang-database.herokuapp.com/users/${user.userId}/words`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(({ data }) => data)
    .catch(() => []);
}

export function makeCombinedWords({ words, userWords }: CombinedWords) {
  if (!userWords.length) {
    return words;
  }
  return words.map((word: IProduct) => {
    const currentWord = userWords.find((item: UserWord) => item.wordId === word.id);
    if (currentWord) {
      return { ...word, meta: currentWord };
    }
    return word;
  });
}

export function filterLearnedWords(words:CombinedWordsData[]) {
  return words.filter((word) => !word.meta || word.meta.difficulty === LEARNED);
}

export async function getGameWords({ group, page, filterLearned }: MakeGameWordsParam) {
  // let requaredAmount = new Array(amount);

  const words = await getWords({ group, page });
  const userWords = await getUserWords();
  const combinedWords = makeCombinedWords({ words, userWords });
  const gameWords = filterLearned ? filterLearnedWords(combinedWords) : combinedWords;
  return gameWords;
}

export function createUserWord({ wordId, wordData }: CreateUserWordParam) {
  const user = getCurrentUser();
  if (!user?.userId) {
    return Promise.resolve();
  }
  return axios.post(
    `https://rslang-database.herokuapp.com/users/${user.userId}/words/${wordId}`,
    {
      data: wordData,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    },
  )
    .then(({ data }) => data)
    .catch(() => []);
}
