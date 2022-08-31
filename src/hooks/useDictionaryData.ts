import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserSigninResp } from '../types';
import { UserContext } from '../contexts';

export default function useDictionaryData() {
  const sessionGroupData = sessionStorage.getItem('group');
  const sessionGroup = Number(sessionGroupData);
  const [wordsData, setWordsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<number>(sessionGroup);
  const [selectedCart, setSelectedCart] = useState('');
  const [hardCard, setHardCard] = useState(['']);
  const [learnedCard, setLearnedCard] = useState(['']);
  const [currentPage, setCurrentPage] = useState(0);
  const user: null | UserSigninResp = useContext(UserContext);
  const [hardWordsData, setHardWordsData] = useState([]);

  async function getWordsData(gr: number, page: number) {
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

  const diffCards = (id: string) => {
    if (learnedCard.includes(id)) {
      setLearnedCard(learnedCard.filter((i) => i !== id));
    }
    const newCardsArr = (): string[] => {
      if (hardCard.includes(id)) {
        return hardCard.filter((i) => i !== id);
      }
      return hardCard.concat([id]);
    };
    setHardCard(newCardsArr);
  };

  const learnCards = (id: string) => {
    if (hardCard.includes(id)) {
      setHardCard(hardCard.filter((i) => i !== id));
    }
    const newCardsArr = (): string[] => {
      if (learnedCard.includes(id)) {
        return learnedCard.filter((i) => i !== id);
      }
      return learnedCard.concat([id]);
    };
    setLearnedCard(newCardsArr);
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
