/* eslint-disable prefer-template */
/* eslint-disable arrow-body-style */
/* eslint-disable no-bitwise */
/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { useState } from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Dictionary from './components/dictionary/Dictionary';
import Audio from './components/audio-game/Audio';
import Sprint from './components/sprint-game/Sprint';
import Statistic from './components/statistic/Statistic';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import { UserContext } from './contexts';
import { getCurrentUser } from './api/user';

export default function App() {
  const sessionPageData = sessionStorage.getItem('page');
  const sessionPage = sessionPageData + '';
  const [render, setRender] = useState<string>(sessionPage);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  async function backCall() {
    await axios.get('https://rslang-database.herokuapp.com/words?page=0&group=0');
  }
  backCall();
  return (
    <UserContext.Provider value={user}>
      <div className="app">
        <Header
          render={render}
          setRender={setRender}
          onLoginClick={() => setIsLoginOpen(true)}
          signout={() => {
            setUser(null);
            localStorage.removeItem('user');
          }}
        />
        {render === 'dict' ? <Dictionary /> : render === 'about' ? <About />
          : render === 'audio' ? <Audio /> : render === 'sprint' ? <Sprint />
            : render === 'statistic' ? <Statistic /> : <Main />}
        <Footer />
        {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} setUser={setUser} />}
      </div>
    </UserContext.Provider>
  );
}
