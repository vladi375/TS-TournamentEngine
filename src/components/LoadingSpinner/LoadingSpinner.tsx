import React from 'react';
import { Spinner, useColorModeValue } from '@chakra-ui/react';

import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const text = useColorModeValue('dark', 'light');

  console.log('text', text);

  return (
    <div
      className='loading-spinner'
      //style={{ background: text === 'light' ? '#e8e8e9' : '#f8f8f8ad' }}
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
