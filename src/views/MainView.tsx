import React from 'react';
import { Container, Flex, Image } from '@chakra-ui/react';

import mainImage from '../assets/images/ts-main-image.png';

const MainView = () => {
  return (
    <Container maxW={'container.lg'} my={14}>
      <Flex
        width={'full'}
        align={'center'}
        justify={'center'}
        direction={'column'}
      >
        <Image src={mainImage} />
      </Flex>
    </Container>
  );
};

export default MainView;
