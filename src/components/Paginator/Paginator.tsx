import React, { FC, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';

import './style.css';

interface PaginatorProperties {
  totalPages: number;
  playersPerPage: number;
  totalPlayers: number;
  paginate: (i: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
  getPlayersDataAndSetPlayers: (number: number) => void;
}

const Paginator: FC<PaginatorProperties> = ({
  totalPages,
  playersPerPage,
  totalPlayers,
  paginate,
  previousPage,
  nextPage,
  currentPage,
  getPlayersDataAndSetPlayers,
}) => {
  const pageNumbers: any[] = [];

  for (let i: number = 1; i <= Math.ceil(totalPlayers / playersPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <Box my={10}>
      <div className='pagination-container'>
        <div className='pagination'>
          <Button
            onClick={previousPage}
            disabled={currentPage === 1 ? true : false}
          >
            Prev
          </Button>
          {pageNumbers.map(number => (
            <Button
              key={number}
              onClick={() => {
                paginate(number);
              }}
              className={
                'page-number ' + (number === currentPage ? 'active' : '')
              }
            >
              {number}
            </Button>
          ))}
          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages ? true : false}
          >
            Next
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Paginator;
