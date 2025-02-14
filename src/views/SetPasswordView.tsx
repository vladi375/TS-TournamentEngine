import { CheckCircleIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Container,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Error from '../components/Error';
import { ROUTES } from '../constants';
import { setPassword } from '../services/accountService';
import { SetPasswordValidationSchema } from '../services/validationSchema';
import useFullPageLoader from '../hooks/useFullPageLoader';

const SetPasswordView = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const initialFormValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: any) => {
    showLoader();

    try {
      await setPassword({
        password: values.password,
        token: searchParams.get('token') ?? '',
      });
      setErrorMessage('');
      setSubmitted(true);
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    hideLoader();
  };

  let content;

  if (submitted && !errorMessage) {
    content = (
      <>
        <Box>
          <CheckCircleIcon mb={4} boxSize={8} color='green.500' />
        </Box>
        <Box textAlign='left'>
          <Heading mb={4} size='md'>
            Password reset
          </Heading>
        </Box>
        <Box textAlign='left'>
          <Button onClick={navigateToLogin}>Login now</Button>
        </Box>
      </>
    );
  } else {
    content = (
      <>
        <Box textAlign='left'>
          <Heading mb={6} size='md'>
            Set your new password
          </Heading>
        </Box>
        <Box mt={4} textAlign='left'>
          <Formik
            initialValues={initialFormValues}
            validationSchema={SetPasswordValidationSchema}
            onSubmit={async values => handleSubmit(values)}
          >
            {(props: any) => (
              <Form>
                <Field name='password'>
                  {({ form, field }: any) => (
                    <FormControl
                      mt={6}
                      isInvalid={
                        form.errors?.password && form.touched?.password
                      }
                    >
                      <FormLabel>Password:</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='*******'
                          {...field}
                        />
                        <InputRightElement
                          children={
                            <IconButton
                              aria-label='show/hide password'
                              icon={
                                showPassword ? <ViewOffIcon /> : <ViewIcon />
                              }
                              variant='unstyled'
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          }
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors?.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='confirmPassword'>
                  {({ form, field }: any) => (
                    <FormControl
                      mt={6}
                      isInvalid={
                        form.errors?.confirmPassword &&
                        form.touched?.confirmPassword
                      }
                    >
                      <FormLabel>Confirm password:</FormLabel>
                      <InputGroup>
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder='*******'
                          {...field}
                        />
                        <InputRightElement
                          children={
                            <IconButton
                              aria-label='show/hide confirm password'
                              icon={
                                showConfirmPassword ? (
                                  <ViewOffIcon />
                                ) : (
                                  <ViewIcon />
                                )
                              }
                              variant='unstyled'
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            />
                          }
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors?.confirmPassword}
                      </FormErrorMessage>
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
                    Reset password
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

export default SetPasswordView;
