/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Header from './components/header/Header';

function App() {
  const [render, setRender] = useState<string>('main');

  return (
    <div className="app">
      <Header setRender={setRender} />
    </div>
  );
}

export default App;
