/* eslint-disable import/no-cycle */
import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.scss';
import { IPaginate } from '../../types';

export default function PaginatedItems({ forcePage, setPage }: IPaginate) {
  const handlePageClick = (event: { selected: number; }) => {
    setPage(event.selected);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="&#10095;"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={30}
      previousLabel="&#10094;"
      forcePage={forcePage}
      /* renderOnZeroPageCount={null} */
    />
  );
}
