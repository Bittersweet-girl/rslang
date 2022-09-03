import axios from 'axios';
// import { useContext } from 'react';
import { GameProps } from '../types';
// import { UserContext } from '../contexts';

// const user = useContext(UserContext);
// if (user) {
//   const { userId, token } = user;
// }

export default function getWords({ group, currentPage }: GameProps) {
  return axios.get(`https://rslang-database.herokuapp.com/words?page=${currentPage}&group=${group}`);
}

// export function newWord({ wordID, status }) {
//   return axios.post(
//     `https://rslang-database.herokuapp.com/${userId}/words/${wordID}`,
//     {
//       difficulty: status,
//       optional: {},
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
// }
