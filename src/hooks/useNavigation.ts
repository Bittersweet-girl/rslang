import { useContext } from 'react';
import { AppContext } from '../contexts';
// import { AppContextParam } from '../types';

export default function useNavigation() {
  const { state, dispatch } = useContext(AppContext);

  return {
    ...state.navigation,
    navigate: (page: string, pageProps = {}) => {
      sessionStorage.setItem('page', page);
      dispatch({ type: 'navigate', payload: { page, pageProps } });
    },
  };
}
