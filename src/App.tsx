import axios from 'axios';
import React, { useState } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { pages } from './components/constants';

export default function App() {
  const sessionPageData = sessionStorage.getItem('page');
  const sessionPage = `${sessionPageData}`;
  const [render, setRender] = useState<string>(sessionPage);

  async function backCall() {
    await axios.get('https://rslang-database.herokuapp.com/words?page=0&group=0');
  }
  backCall();
  const ActivePage = pages[render as keyof typeof pages];
  return (
    <div className="app">
      <Header render={render} setRender={setRender} />
      <ActivePage />
      <Footer />
    </div>
  );
}
