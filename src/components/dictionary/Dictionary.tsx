/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product';
import { IProduct } from '../../interfaces/interfaces';
import './dictionary.scss';

export default function Dictionary() {
  const sessionGroupData = sessionStorage.getItem('group');
  const sessionGroup = Number(sessionGroupData);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<number>(sessionGroup);

  async function getData(gr: number) {
    setLoading(true);
    const response = await axios.get(`https://rslang-database.herokuapp.com/words?page=0&group=${gr}`);
    setProducts(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getData(group);
  }, []);
  function changeGroup(gr: number) {
    sessionStorage.setItem('group', gr.toString());
    getData(gr);
    setGroup(gr);
    console.log(sessionGroup);
  }

  const colors = [
    { backgroundColor: '' },
    { backgroundColor: '#FDE500' },
    { backgroundColor: '#FE941B' },
    { backgroundColor: '#4FCB64' },
    { backgroundColor: '#15C9FE' },
    { backgroundColor: '#FE95D0' },
    { backgroundColor: '#CC62A5' },
  ];

  return (
    <div className="dictionary">
      <nav className="dictionary-menu">
        <button type="button" className="dictionary-menu__button dictionary-menu__button_first btn" onClick={() => {
          changeGroup(0);
          sessionStorage.setItem('group', '0');
        }} style={group === 0 ? colors[1] : colors[0]}>
          Раздел 1
        </button>
        <button type="button" className="dictionary-menu__button dictionary-menu__button_second btn" onClick={() => {
          changeGroup(1);
          sessionStorage.setItem('group', '1');
        }} style={group === 1 ? colors[2] : colors[0]}>
          Раздел 2
        </button>
        <button type="button" className="dictionary-menu__button dictionary-menu__button_third btn" onClick={() => {
          changeGroup(2);
          sessionStorage.setItem('group', '2');
        }} style={group === 2 ? colors[3] : colors[0]}>
          Раздел 3
        </button>
        <button type="button" className="dictionary-menu__button dictionary-menu__button_fourth btn" onClick={() => {
          changeGroup(3);
          sessionStorage.setItem('group', '3');
        }} style={group === 3 ? colors[4] : colors[0]}>
          Раздел 4
        </button>
        <button type="button" className="dictionary-menu__button dictionary-menu__button_fifth btn" onClick={() => {
          changeGroup(4);
          sessionStorage.setItem('group', '4');
        }} style={group === 4 ? colors[5] : colors[0]}>
          Раздел 5
        </button>
        <button type="button" className="dictionary-menu__button dictionary-menu__button_sixth btn" onClick={() => {
          changeGroup(5);
          sessionStorage.setItem('group', '5');
        }} style={group === 5 ? colors[6] : colors[0]}>
          Раздел 6
        </button>
      </nav>
      { loading && <p className="text-center">Loading...</p>}
      <div className="dictionary__cards">
        { products.map((product: IProduct) => <Product product={product} />)}
      </div>
    </div>
  );
}
