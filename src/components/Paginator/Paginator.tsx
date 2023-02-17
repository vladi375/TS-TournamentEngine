import React, { FC } from 'react';
import * as Scroll from 'react-scroll';

import './style.css';

interface PaginatorProperties {
  playersPerPage: number;
  totalPlayers: number;
  paginate: (i: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
}

let scroll = Scroll.animateScroll;

const Paginator: FC<PaginatorProperties> = ({
  playersPerPage,
  totalPlayers,
  paginate,
  previousPage,
  nextPage,
  currentPage,
}) => {
  const pageNumbers: any[] = [];

  for (let i: number = 1; i <= Math.ceil(totalPlayers / playersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination-container' onClick={scroll.scrollToTop}>
      <ul className='pagination'>
        <li onClick={previousPage} className='page-number'>
          Prev
        </li>
        {pageNumbers.map(number => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={
              'page-number ' + (number === currentPage ? 'active' : '')
            }
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className='page-number'>
          Next
        </li>
      </ul>
    </div>
  );
};

export default Paginator;
