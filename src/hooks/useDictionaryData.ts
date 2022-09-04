/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-len */
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserSigninResp, IUserWords } from '../types';
import { UserContext } from '../contexts';

export default function useDictionaryData() {
  const sessionGroupData = sessionStorage.getItem('group');
  const sessionGroup = Number(sessionGroupData);
  const [wordsData, setWordsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<number>(sessionGroup);
  const [selectedCart, setSelectedCart] = useState('');
  const [userCards, setUserCards] = useState(['']);
  const [hardCard, setHardCard] = useState(['']);
  const [learnedCard, setLearnedCard] = useState(['']);
  const [currentPage, setCurrentPage] = useState(0);
  const user: null | UserSigninResp = useContext(UserContext);
  const [hardWordsData, setHardWordsData] = useState([]);

  async function getWordsData(gr: number, page: number) {
    getUserWordsIds();
    setLoading(true);
    const response = await axios.get(`https://rslang-database.herokuapp.com/words?page=${page === 0 ? 0 : page - 1}&group=${gr}`);
    setWordsData(response.data);
    setLoading(false);
  }

  async function getHardWords() {
    const response = await axios.get(
      `https://rslang-database.herokuapp.com/users/${user?.userId}/aggregatedWords`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        params: {
          filter: '{"$and":[{"userWord.difficulty":"hard"}]}',
        },
      },
    );
    setHardWordsData(response.data[0].paginatedResults);
  }

  async function getUserWordsIds() {
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

    setUserCards(userWordsId);
    setHardCard(hardWordsId);
    setLearnedCard(learnedWordsId);
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
    setCurrentPage(1);
  }
  const handleClick = (id: string) => {
    if (selectedCart === id) {
      setSelectedCart('');
    } else {
      setSelectedCart(id);
    }
  };

  function postUserWord(id: string, status: string) {
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

  function deleteUserWord(id: string) {
    return axios.delete(
      `https://rslang-database.herokuapp.com/users/${user?.userId}/words/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },
    );
  }

  function putUserWord(id: string, status: string) {
    return axios.put(
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

  const diffCards = (id: string) => {
    if (!userCards.includes(id)) {
      postUserWord(id, 'hard');
      getUserWordsIds();
    }
    if (hardCard.includes(id)) {
      deleteUserWord(id);
      getUserWordsIds();
    }
    if (learnedCard.includes(id)) {
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
      deleteUserWord(id);
      getUserWordsIds();
    }
    if (hardCard.includes(id)) {
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
  };
}
