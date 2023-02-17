import { Box, Text, useColorMode } from '@chakra-ui/react';

const Error = ({ error }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      mt={6}
      p={2}
      textAlign={'center'}
      borderRadius={5}
      borderWidth={1}
      borderColor={colorMode === 'light' ? 'red.600' : 'whiteAlpha.400'}
      background={colorMode === 'light' ? 'red.100' : 'red.600'}
    >
      <Text>{error}</Text>
    </Box>
  );
};

export default Error;
