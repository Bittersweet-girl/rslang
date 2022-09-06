/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-len */
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserSigninResp, IUserWords, Id } from '../types';
import { UserContext } from '../contexts';

export default function useDictionaryData() {
  const sessionGroupData = sessionStorage.getItem('group');
  const sessionGroup = Number(sessionGroupData);
  const [wordsData, setWordsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<number>(sessionGroup);
  const [selectedCart, setSelectedCart] = useState('');
  const [userData, setUserData] = useState([]);
  const [userCards, setUserCards] = useState(['']);
  const [hardCard, setHardCard] = useState(['']);
  const [learnedCard, setLearnedCard] = useState(['']);
  const [easyCard, setEasyCard] = useState(['']);
  const [currentPage, setCurrentPage] = useState(0);
  const user: null | UserSigninResp = useContext(UserContext);
  const [hardWordsData, setHardWordsData] = useState([]);

  async function getWordsData(gr: number, page: number) {
    getUserWordsIds();
    setLoading(true);
    const response = await axios.get(`https://rslang-database.herokuapp.com/words?page=${page}&group=${gr}`);
    setWordsData(response.data);
    setLoading(false);
  }

  async function getHardWords() {
    if (user) {
      const response = await axios.get(
        `https://rslang-database.herokuapp.com/users/${user?.userId}/aggregatedWords`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          params: {
            wordsPerPage: '600',
            filter: '{"$and":[{"userWord.difficulty":"hard"}]}',
          },
        },
      );
      setHardWordsData(response.data[0].paginatedResults);
    }
  }

  async function getUserWordsIds() {
    if (user) {
      const response = await axios.get(
        `https://rslang-database.herokuapp.com/users/${user?.userId}/words`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      const userWordsId = response.data.map((i: IUserWords) => i.wordId);
      const hardWordsId = response.data.filter((i: IUserWords) => i.difficulty === 'hard').map((i: IUserWords) => i.wordId);
      const learnedWordsId = response.data.filter((i: IUserWords) => i.difficulty === 'learned').map((i: IUserWords) => i.wordId);
      const easyWordsId = response.data.filter((i: IUserWords) => i.difficulty === 'easy').map((i: IUserWords) => i.wordId);

      setUserData(response.data);
      setUserCards(userWordsId);
      setHardCard(hardWordsId);
      setLearnedCard(learnedWordsId);
      setEasyCard(easyWordsId);
      /* console.log(userData); */
    }
  }

  useEffect(() => {
    getWordsData(group, currentPage);
  }, [group, currentPage]);

  useEffect(() => {
    getHardWords();
  }, [hardCard, learnedCard]);

  function changeGroup(gr: number) {
    sessionStorage.setItem('group', gr.toString());
    setGroup(gr);
    setCurrentPage(0);
  }

  const handleClick = (id: string) => {
    if (selectedCart === id) {
      setSelectedCart('');
    } else {
      setSelectedCart(id);
    }
  };

  async function postUserWord(id: string, status: string) {
    return axios.post(
      `https://rslang-database.herokuapp.com/users/${user?.userId}/words/${id}`,
      {
        difficulty: status,
        optional: {},
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },
    );
  }

  async function putUserWord(id: string, status: string) {
    const wordData = userData.filter((el: Id) => el.wordId === id).map((i: Id) => i.optional);
    const options = wordData[0] ? wordData[0] : {};
    return axios.put(
      `https://rslang-database.herokuapp.com/users/${user?.userId}/words/${id}`,
      {
        difficulty: status,
        optional: options,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },
    );
  }

  const diffCards = (id: string) => {
    if (!userCards.includes(id)) {
      postUserWord(id, 'hard');
      getUserWordsIds();
    }
    if (hardCard.includes(id)) {
      putUserWord(id, 'easy');
      getUserWordsIds();
    }
    if (learnedCard.includes(id) || easyCard.includes(id)) {
      putUserWord(id, 'hard');
      getUserWordsIds();
    }

    getUserWordsIds();
  };

  const learnCards = (id: string) => {
    if (!userCards.includes(id)) {
      postUserWord(id, 'learned');
      getUserWordsIds();
    }
    if (learnedCard.includes(id)) {
      putUserWord(id, 'easy');
      getUserWordsIds();
    }
    if (hardCard.includes(id) || easyCard.includes(id)) {
      putUserWord(id, 'learned');
      getUserWordsIds();
    }

    getUserWordsIds();
  };
  return {
    group,
    changeGroup,
    wordsData,
    loading,
    hardWordsData,
    handleClick,
    diffCards,
    learnCards,
    hardCard,
    selectedCart,
    learnedCard,
    currentPage,
    setCurrentPage,
    userData,
  };
}
