import { FC, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import * as _ from 'lodash';

import './style.css';

interface PaginatorProperties {
  totalPages: number;
  goToPage: (pageIndex: number) => void;
  currentPage: number;
}

const Paginator: FC<PaginatorProperties> = ({
  totalPages,
  goToPage,
  currentPage,
}) => {
  const DOTS = '...';

  const getPageNumbers = () => {
    if (totalPages <= maxPages) {
      return _.range(1, totalPages);
    }

    if (currentPage <= 4) {
      return [..._.range(1, maxPages + 1), DOTS, totalPages];
    }

    if (currentPage > 4 && currentPage <= totalPages - 4) {
      return [
        1,
        DOTS,
        ..._.range(currentPage - 2, currentPage + 3),
        DOTS,
        totalPages,
      ];
    }

    if (currentPage > totalPages - 4) {
      return [1, DOTS, ..._.range(totalPages - 4, totalPages + 1)];
    }
  };

  const maxPages = 5;
  const pageNumbers = getPageNumbers() ?? [];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <Box my={10}>
      <div className='pagination-container'>
        <div className='pagination'>
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1 ? true : false}
          >
            Prev
          </Button>
          {pageNumbers.map((number, index) =>
            number === DOTS ? (
              <span key={index}>{number}</span>
            ) : (
              <Button
                key={index}
                onClick={() => goToPage(number as number)}
                className={
                  'page-number ' + (number === currentPage ? 'active' : '')
                }
              >
                {number}
              </Button>
            )
          )}
          <Button
            onClick={() => goToPage(currentPage + 1)}
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
