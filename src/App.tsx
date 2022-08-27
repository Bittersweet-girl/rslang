import axios from 'axios';
import React, { useState } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import { UserContext } from './contexts';
import { getCurrentUser } from './api/user';
import { pages } from './constants';

export default function App() {
  const sessionPageData = sessionStorage.getItem('page');
  const sessionPage = `${sessionPageData}`;
  const [render, setRender] = useState<string>(sessionPage);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  async function backCall() {
    await axios.get('https://rslang-database.herokuapp.com/words?page=0&group=0');
  }
  backCall();
  const ActivePage = pages[render as keyof typeof pages];
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
        <ActivePage />
        <Footer />
        {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} setUser={setUser} />}
      </div>
    </UserContext.Provider>
  );
}
