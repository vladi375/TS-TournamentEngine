import { Container, Text } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Container centerContent>
      <Text fontSize='9xl' fontWeight='thin'>
        404
      </Text>
      <Text textAlign='center' fontSize='xl'>
        The item you are looking for could not be found
      </Text>
    </Container>
  );
};

export default NotFoundPage;
