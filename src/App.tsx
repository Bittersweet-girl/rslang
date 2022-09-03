import axios from 'axios';
import React, { useReducer, useState, useMemo } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import { AppContext, UserContext } from './contexts';
import { getCurrentUser } from './api/user';
import { PAGE_MAIN } from './constants';
import appReducer from './reducers/appReducer';
import Dictionary from './components/dictionary/Dictionary';
import Main from './components/main/Main';
import Sprint from './components/sprint-game/Sprint';
import Statistic from './components/sprint-game/Statistic';
import About from './components/about/About';
import AudioGame from './components/audio-game/AudioGame';

export const pages = {
  dictionary: Dictionary,
  main: Main,
  null: Main,
  audio: AudioGame,
  sprint: Sprint,
  statistic: Statistic,
  about: About,
};

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

  async function backCall() {
    await axios.get('https://rslang-database.herokuapp.com/words?page=0&group=0');
  }
  backCall();
  const ActivePage = pages[page as keyof typeof pages];

  return (
    <UserContext.Provider value={user}>
      <AppContext.Provider value={appContextValue}>
        <div className="app">
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
