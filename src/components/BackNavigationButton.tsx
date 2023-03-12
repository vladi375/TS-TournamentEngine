import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BackNavigationButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      leftIcon={<ChevronLeftIcon />}
      colorScheme='orange'
      variant='link'
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackNavigationButton;
