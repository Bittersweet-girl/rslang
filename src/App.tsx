/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Dictionary from './components/Dictionary';
import Audio from './components/Audio';
import Sprint from './components/Sprint';
import Statistic from './components/Statistic';
import About from './components/About';

function App() {
  const [render, setRender] = useState<string>('main');
  return (
    <div className="app">
      <Header setRender={setRender} />
      { render === 'dict' ? <Dictionary /> : render === 'main' ? <Main />
        : render === 'audio' ? <Audio /> : render === 'sprint' ? <Sprint />
          : render === 'statistic' ? <Statistic /> : <About />}
      {/* {() => {
        switch (render) {
          case 'about':
  <About />;
            break;
          case 'dict':
  <Dictionary />;
            break;
          case 'audio':
  <Audio />;
            break;
          case 'sprint':
  <Sprint />;
            break;
          case 'statistic':
  <Statistic />;
            break;
          default:
  <Main />;
            break;
        }
      }} */}
    </div>
  );
}

export default App;
