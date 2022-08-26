/* eslint-disable import/no-cycle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../words/Product';
import { IProduct } from '../../interfaces/interfaces';
import { COLORS } from '../constants';
import './dictionary.scss';
import Loader from '../loader/Loader';

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
  }

  return (
    <div className="dictionary">
      <nav className="dictionary-menu">
        <button
          type="button"
          className="dictionary-menu__button dictionary-menu__button_first btn"
          onClick={() => {
            changeGroup(0);
            sessionStorage.setItem('group', '0');
          }}
          style={group === 0 ? COLORS[1] : COLORS[0]}
        >
          Раздел 1
        </button>
        <button
          type="button"
          className="dictionary-menu__button dictionary-menu__button_second btn"
          onClick={() => {
            changeGroup(1);
            sessionStorage.setItem('group', '1');
          }}
          style={group === 1 ? COLORS[2] : COLORS[0]}
        >
          Раздел 2
        </button>
        <button
          type="button"
          className="dictionary-menu__button dictionary-menu__button_third btn"
          onClick={() => {
            changeGroup(2);
            sessionStorage.setItem('group', '2');
          }}
          style={group === 2 ? COLORS[3] : COLORS[0]}
        >
          Раздел 3
        </button>
        <button
          type="button"
          className="dictionary-menu__button dictionary-menu__button_fourth btn"
          onClick={() => {
            changeGroup(3);
            sessionStorage.setItem('group', '3');
          }}
          style={group === 3 ? COLORS[4] : COLORS[0]}
        >
          Раздел 4
        </button>
        <button
          type="button"
          className="dictionary-menu__button dictionary-menu__button_fifth btn"
          onClick={() => {
            changeGroup(4);
            sessionStorage.setItem('group', '4');
          }}
          style={group === 4 ? COLORS[5] : COLORS[0]}
        >
          Раздел 5
        </button>
        <button
          type="button"
          className="dictionary-menu__button dictionary-menu__button_sixth btn"
          onClick={() => {
            changeGroup(5);
            sessionStorage.setItem('group', '5');
          }}
          style={group === 5 ? COLORS[6] : COLORS[0]}
        >
          Раздел 6
        </button>
      </nav>
      { loading && <Loader />}
      <div className="dictionary__cards">
        { products.map((product: IProduct) => <Product product={product} key={product.id} />)}
      </div>
    </div>
  );
}
