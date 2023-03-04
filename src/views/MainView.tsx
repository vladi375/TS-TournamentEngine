import React from 'react';
import { Container, Flex, Text } from '@chakra-ui/react';

const MainView = () => {
  return (
    <Container maxW={'container.lg'} my={14}>
      <Flex
        width={'full'}
        align={'center'}
        justify={'center'}
        direction={'column'}
      >
        <Text>'Hello'</Text>
      </Flex>
    </Container>
  );
};

export default MainView;
