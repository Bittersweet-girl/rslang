import React, {
  useReducer, useState, useMemo,
} from 'react';
import axios from 'axios';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import { INewTokens } from './types';
import { AppContext, UserContext } from './contexts';
import { getCurrentUser } from './api/user';
import { pages, PAGE_MAIN } from './constants';
import appReducer from './reducers/appReducer';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const initialState = {
    navigation: {
      page: sessionStorage.getItem('page') || PAGE_MAIN,
      pageProps: {},
    },
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const appContextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  const [user, setUser] = useState(getCurrentUser());
  const { page, pageProps } = state.navigation || {};

  /* async function backCall() {
    await axios.get('https://rslang-database.herokuapp.com/words?page=0&group=0');
  }
  backCall(); */
  async function refresh() {
    const res = user;
    const newTokens: INewTokens = await axios.get(
      `https://rslang-database.herokuapp.com/users/${user?.userId}/tokens`,
      {
        headers: {
          Authorization: `Bearer ${user?.refreshToken}`,
        },
      },
    );
    res.token = newTokens.data.token;
    res.refreshToken = newTokens.data.refreshToken;
    localStorage.setItem('user', JSON.stringify(res));
    setUser(res);
    console.log('updated');
  }

  const ActivePage = pages[page as keyof typeof pages];

  return (
    <UserContext.Provider value={user}>
      <AppContext.Provider value={appContextValue}>
        <div className="app">
          <button type="button" onClick={refresh}>refresh</button>
          <Header
            onLoginClick={() => setIsLoginOpen(true)}
            signout={() => {
              setUser(null);
              localStorage.removeItem('user');
            }}
          />
          <ActivePage {...pageProps} />
          <Footer />
          {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} setUser={setUser} />}
        </div>
      </AppContext.Provider>
    </UserContext.Provider>
  );
}
