import { Container, Text } from "@chakra-ui/react";

const ForbiddenPage = () => {
  return (
    <Container centerContent>
      <Text fontSize="9xl" fontWeight="thin">
        403
      </Text>
      <Text textAlign="center" fontSize="xl">
        You aren't authorized to access this page
      </Text>
    </Container>
  );
};

export default ForbiddenPage;
