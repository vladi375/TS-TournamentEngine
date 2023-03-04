import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Field, Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import ResetPassword from '../models/resetPassword';
import { ResetPasswordValidationSchema } from '../services/validationSchema';
import { resetPassword } from '../services/accountService';
import Error from '../components/Error';
import useFullPageLoader from '../hooks/useFullPageLoader';

const ResetPasswordView = () => {
  const initialFormValues: ResetPassword = {
    email: '',
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const handleSubmit = async (form: ResetPassword) => {
    showLoader();

    try {
      await resetPassword(form);
      setErrorMessage('');
      setIsSubmitted(true);
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    hideLoader();
  };

  let content;

  if (isSubmitted && !errorMessage) {
    content = (
      <>
        <Box>
          <CheckCircleIcon mb={4} boxSize={8} color='green.500' />
        </Box>
        <Box textAlign='left'>
          <Heading mb={4} size='md'>
            Email Sent
          </Heading>
        </Box>
        <Box textAlign='left'>
          <Text>Check your email and open the link to continue</Text>
        </Box>
      </>
    );
  } else {
    content = (
      <>
        <Box textAlign='left'>
          <Heading mb={6} size='md'>
            Enter your email and we'll send you a link to reset your password
          </Heading>
        </Box>
        <Box mt={4} textAlign='left'>
          <Formik
            initialValues={initialFormValues}
            validationSchema={ResetPasswordValidationSchema}
            onSubmit={async values => handleSubmit(values)}
          >
            {(props: FormikProps<ResetPassword>) => (
              <Form>
                <Field name='email'>
                  {({ form, field }: any) => (
                    <FormControl
                      mt={6}
                      isInvalid={form.errors?.email && form.touched?.email}
                    >
                      <FormLabel>Email:</FormLabel>
                      <Input
                        type='email'
                        placeholder='best.ts.player@gmail.com'
                        {...field}
                      />
                      <FormErrorMessage>{form.errors?.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {errorMessage && <Error error={errorMessage}></Error>}
                <Box textAlign={'center'}>
                  <Button
                    colorScheme='teal'
                    variant='outline'
                    width='36'
                    textAlign={'center'}
                    mt={10}
                    type='submit'
                  >
                    Send link to email
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </>
    );
  }

  return (
    <React.Fragment>
      <Container maxW={'container.md'} my={14}>
        <Flex align='center' justifyContent='center'>
          <Box
            p={12}
            width={'500px'}
            borderWidth={1}
            borderRadius={8}
            boxShadow='lg'
          >
            {content}
          </Box>
        </Flex>
      </Container>
      <>{loader}</>
    </React.Fragment>
  );
};

export default ResetPasswordView;
