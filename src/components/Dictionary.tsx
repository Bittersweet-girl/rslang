/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Product } from './Product';
import { IProduct } from './interfaces';

export function Dictionary() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const response = await axios.get('https://rslang-database.herokuapp.com/words?page=0&group=0');
    setProducts(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dictionaryPage">
      { loading && <p className="text-center">Loading...</p>}
      { products.map((product: IProduct) => <Product {...product} />)}
    </div>
  );
}
