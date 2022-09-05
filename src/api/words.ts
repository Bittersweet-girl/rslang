import axios from 'axios';
import {
  CombinedWords,
  CombinedWordsData,
  CreateUserWordParam,
  GetWordsParam, IProduct,
  MakeGameWordsParam, UserWord,
} from '../types';
import { getCurrentUser } from './user';
import { difficulties } from '../constants';

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

// export async function getCombinedWords({ group, page }) {
//   const words = (await getWords({ group, page }));
//   const userWords = await getUserWords();
//   return makeCombinedWords({ words, userWords });
// }

export function filterLearnedWords(words:CombinedWordsData[]) {
  return words.filter((word) => !word.meta || word.meta.difficulty === difficulties.LEARNED);
}

export async function getGameWords({
  group, page, filterLearned, amount,
}: MakeGameWordsParam) {
  const userWords = await getUserWords();
  let result: CombinedWordsData[] = [];

  const load = async (currentPage: number):Promise<CombinedWordsData[]> => {
    const words = await getWords({ group, page: currentPage });
    const combinedWords = makeCombinedWords({ words, userWords });
    const gameWords = filterLearned ? filterLearnedWords(combinedWords) : combinedWords;
    result = [...result, ...gameWords];
    const shouldLoadMore = result.length < amount && currentPage > 0;

    return shouldLoadMore ? load(currentPage - 1) : result;
  };

  return load(page);
}

// getGameWords({
//   group: 1, page: 10, filterLearned: true, amount: 100,
// }).then((data) => {
//   console.log('getGameWords', data.length, data);
// });

// getCombinedWords({ group: 1, page: 1 }).then((words) => {
//   console.log('combinedwords', words);
//   // console.log(words.map((word) => word.optional));
// });

// getUserWords().then((data) => {
//   console.log('data', data);
// });

// const newWord: NewUserWord = {
//   difficulty: 'hard', | learned | easy
//   optional: {
//     sprint: {
//       correct: 3,
//       wrong: 3,
//       correctRow: 3,
//     },
//   },
// };

export function saveUserWord({ wordId, wordData, usePut = false }: CreateUserWordParam) {
  const user = getCurrentUser();
  if (!user?.userId) {
    return Promise.reject();
  }
  return axios({
    url: `https://rslang-database.herokuapp.com/users/${user.userId}/words/${wordId}`,
    method: usePut ? 'PUT' : 'POST',
    data: wordData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(({ data }) => data);
}

// createUserWord({ wordId: '5e9f5ee35eb9e72bc21afe15', wordData: newWord, usePut: false })
// .then((data) => {
//   console.log('data', data);
// });
