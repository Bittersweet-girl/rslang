/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Footer from './components/footer/footer';
import Header from './components/header/Header';
import Main from './components/main/main';

function App() {
  const [/* render */, setRender] = useState<string>('main');

  return (
    <div className="app">
      <Header setRender={setRender} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
