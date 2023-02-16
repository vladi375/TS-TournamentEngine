import { Box, Text } from "@chakra-ui/react";

const Error = ({ error }: any) => {
  return (
    <Box
      mt={6}
      p={2}
      textAlign={"center"}
      borderRadius={5}
      borderWidth={1}
      borderColor="red.600"
      background={"#ffebe8"}
    >
      <Text color={"black.500"}>{error}</Text>
    </Box>
  );
};

export default Error;
