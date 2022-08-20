/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Footer from './components/footer/footer';
import Header from './components/header/Header';

function App() {
  const [render, setRender] = useState<string>('main');

  return (
    <div className="app">
      <Header setRender={setRender} />
      <Footer />
    </div>
  );
}

export default App;
