import axios from 'axios';
import React, { useReducer, useState, useMemo } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
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

  async function backCall() {
    await axios.get('https://rslang-database.herokuapp.com/words?page=0&group=0');
  }
  backCall();
  const ActivePage = pages[page as keyof typeof pages];

  return (
    <UserContext.Provider value={user}>
      <AppContext.Provider value={appContextValue}>
        <div className="app">
          <div className="wrapper">
            <Header
              onLoginClick={() => setIsLoginOpen(true)}
              signout={() => {
                setUser(null);
                localStorage.removeItem('user');
              }}
            />
            <ActivePage {...pageProps} />
          </div>
          <Footer />
          {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} setUser={setUser} />}
        </div>
      </AppContext.Provider>
    </UserContext.Provider>
  );
}
