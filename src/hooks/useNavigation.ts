import { useContext } from 'react';
import { AppContext } from '../contexts';
// import { AppContextParam } from '../types';

export default function useNavigation() {
  const { state, dispatch } = useContext(AppContext);
  // console.log('useNavigation, state', state);

  return {
    ...state.navigation,
    navigate: (page: string, pageProps = {}) => {
      // console.log('navigate', page, pageProps);
      sessionStorage.setItem('page', page);
      dispatch({ type: 'navigate', payload: { page, pageProps } });
    },
  };
}
