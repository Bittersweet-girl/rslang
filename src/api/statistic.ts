import axios from 'axios';
import { difficulties } from '../constants';
import { SaveStatisticParam } from '../types';
import { getCurrentUser } from './user';

const EMPTY_GAME_STATISTIC = {
  correct: 0,
  wrong: 0,
  correctRow: 0,
  newWords: 0,
  learned: 0,
};

export function getStatistic() {
  const user = getCurrentUser();
  const defaultData = {
    learnedWords: 0,
    optional: {},
  };
  if (!user?.userId) {
    return Promise.resolve(defaultData);
  }
  return axios.get(`https://rslang-database.herokuapp.com/users/${user.userId}/statistics`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(({ data }) => data)
    .catch(() => defaultData);
}

function getDayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

export async function getTodayStatistic() {
  const todayDate = getDayKey();
  const statistic = await getStatistic();
  const todayStats = statistic?.optional?.[todayDate] || {};
  return { audio: EMPTY_GAME_STATISTIC, sprint: EMPTY_GAME_STATISTIC, ...todayStats };
}

// getTodayStatistic().then((data) => console.log(data));

export async function saveStatistic({
  game, correct, wrong, correctRow, newWords, learned,
}: SaveStatisticParam) {
  const user = getCurrentUser();
  if (!user?.userId) {
    return Promise.reject();
  }
  const key = getDayKey();
  const { learnedWords = 0, optional = {} } = await getStatistic();
  const todayStat = optional[key] || {};
  const todayGame = todayStat[game] || { ...EMPTY_GAME_STATISTIC };

  const newStats = {
    learnedWords,
    optional: {
      ...optional,
      [key]: {
        ...todayStat,
        [game]: {
          correct: todayGame.correct + correct,
          wrong: todayGame.wrong + wrong,
          correctRow: Math.max(todayGame.correctRow, correctRow),
          newWords: todayGame.newWords + newWords,
          learned: todayGame.learned + learned,
        },
      },
    },
  };

  // console.log('saveStatistic', {
  //   game, correct, wrong, correctRow, newWords, learned,
  // });

  return axios.put(
    `https://rslang-database.herokuapp.com/users/${user.userId}/statistics`,
    newStats,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  )
    .then(({ data }) => data);
}

// getStatistic().then((data) => {
//   console.log('getStatistic', data);
// });

export function getLeurnedWords() {
  const user = getCurrentUser();
  if (!user?.userId) {
    return Promise.reject();
  }
  return axios.get(`https://rslang-database.herokuapp.com/users/${user?.userId}/aggregatedWords`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: {
      filter: `{"$and":[{"userWord.difficulty":"${difficulties.LEARNED}"}]}`,
    },
  })
    .then(({ data }) => ({
      words: data[0].paginatedResults,
      count: data[0].totalCount[0].count,
    }))
    .catch(() => []);
}
