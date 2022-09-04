import axios from 'axios';
import { SaveStatisticParam } from '../types';
import { getCurrentUser } from './user';

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
    .catch((e) => {
      console.log(e);
      return defaultData;
    });
}

function getDayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

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
  const todaySprint = todayStat.sprint || {
    correct: 0,
    wrong: 0,
    correctRow: 0,
    newWords: 0,
    learned: 0,
  };

  const newStats = {
    learnedWords,
    optional: {
      ...optional,
      [key]: {
        ...todayStat,
        sprint: {
          correct: todaySprint.correct + correct,
          wrong: todaySprint.wrong + wrong,
          correctRow: Math.max(todaySprint.correctRow, correctRow),
          newWords: todaySprint.newWords + newWords,
          learned: todaySprint.learned + learned,
        },
      },
    },
  };
  console.log('saveStatistic', {
    game, correct, wrong, correctRow, newWords, learned,
  });
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
