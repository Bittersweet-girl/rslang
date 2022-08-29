/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.scss';
import { IPaginate } from '../../interfaces/interfaces';
import { items } from '../constants';

export default function PaginatedItems(props: IPaginate) {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const {
    itemsPerPage, setPage,
  } = props;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(items.length / itemsPerPage));
    setPage(items.slice(itemOffset, endOffset)[0]);
  }, [itemOffset, itemsPerPage, setPage]);

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="&#8680;"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="&#8678;"
      /* renderOnZeroPageCount={0} */
    />
  );
}
