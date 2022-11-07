import { Container, Flex, Box, Image, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import { getUserSignedUp } from '../store/SignUp/signUpSelector';

import logo from './../assets/images/success4.png';

const MainView = () => {
  const isUserSignedUp = useAppSelector(getUserSignedUp);
  return (
    <Container maxW={'container.lg'} my={14}>
      <Flex
        width={'full'}
        align={'center'}
        justify={'center'}
        direction={'column'}
      >
        {isUserSignedUp ? (
          <React.Fragment>
            <Box p={12} maxWidth='800px'>
              <Image src={logo} boxSize='400px' alt='success' />
              <Heading textAlign={'center'} size={'2xl'} mb={4}>
                Success!
              </Heading>
            </Box>
            <Box>
              <Text textAlign={'center'}>
                Please check your email for further instructions on how to
                complete your account setup
              </Text>
            </Box>
          </React.Fragment>
        ) : (
          <Text>'Hello'</Text>
        )}
      </Flex>
    </Container>
  );
};

export default MainView;
