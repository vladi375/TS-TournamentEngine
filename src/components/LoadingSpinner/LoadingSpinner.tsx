import React from 'react';
import { Spinner } from '@chakra-ui/react';

import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='#319795'
        size='xl'
        className='spinner'
      />
    </div>
  );
};

export default LoadingSpinner;
