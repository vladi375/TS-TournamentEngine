import React from 'react';
import { Spinner, useColorMode } from '@chakra-ui/react';

import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const { colorMode } = useColorMode();

  return (
    <div
      className='loading-spinner'
      style={{
        backgroundColor: colorMode === 'light' ? '#f8f8f8ad' : '#1a202c8c',
      }}
    >
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
