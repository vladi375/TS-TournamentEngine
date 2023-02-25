import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

interface ConfirmationAlertProps {
  isOpen: boolean;
  title: string;
  description: string;
  action: string;
  onClose: (triggerAction: boolean) => void;
}

const ConfirmationAlert = ({
  isOpen,
  onClose,
  title,
  description,
  action,
}: ConfirmationAlertProps) => {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => onClose(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose(false)}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => onClose(true)} ml={3}>
              {action}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationAlert;
