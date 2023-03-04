import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Flex,
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  // FormHelperText,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';

import {
  Formik,
  FormikProps,
  Form,
  Field,
  // FieldProps,
} from 'formik';

import { SignUpValidationSchema } from '../services/validationSchema';
import { countries, ROUTES } from '../constants';

import { useAppSelector } from '../hooks/hooks';
import { selectUserIsAdmin } from './../store/userSlice';
import useFullPageLoader from '../hooks/useFullPageLoader';
import { signUp } from '../services/accountService';

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nickname: string;
  country: string;
}

const SignUpView = () => {
  const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    nickname: '',
    country: '',
  };

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const isAdmin = useAppSelector(selectUserIsAdmin);

  const navigate = useNavigate();

  const handleSubmit = async (values: SignUpFormValues) => {
    showLoader();

    try {
      await signUp(values);
    } catch {
      // handle error
    }

    hideLoader();
    navigate(ROUTES.HOME);
  };

  return (
    <React.Fragment>
      <Container maxW={'container.md'} my={14}>
        <Flex width='full' align='center' justifyContent='center'>
          <Box
            p={12}
            maxWidth='700px'
            borderWidth={1}
            borderRadius={8}
            boxShadow='lg'
          >
            <Box textAlign='center'>
              {isAdmin ? (
                <Heading mb={4} size='lg'>
                  Add a new player to the game!
                </Heading>
              ) : (
                <Heading mb={4} size='lg'>
                  Join the game!
                </Heading>
              )}
            </Box>
            <Box textAlign='center' mb={8}>
              {isAdmin ? (
                <Text>
                  Invite a new player so that he could start an amazing journey
                  in tournament and playing against people from all over the
                  world!
                </Text>
              ) : (
                <Text>
                  Create an account to start your amazing journey in tournament
                  and playing against people from all over the world!
                </Text>
              )}
            </Box>
            <Box mt={4} textAlign='left'>
              <Formik
                initialValues={initialValues}
                validationSchema={SignUpValidationSchema}
                onSubmit={(values, actions) => {
                  handleSubmit(values);
                }}
              >
                {(props: FormikProps<SignUpFormValues>) => (
                  <Form>
                    <Field name='firstName'>
                      {({ form, field }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors?.firstName && form.touched?.firstName
                          }
                        >
                          <FormLabel>Firstname:</FormLabel>
                          <Input
                            type='text'
                            placeholder='Enter firstname'
                            {...field}
                          />
                          <FormErrorMessage>
                            {form.errors?.firstName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='lastName'>
                      {({ form, field }: any) => (
                        <FormControl
                          mt={6}
                          isInvalid={
                            form.errors?.lastName && form.touched?.lastName
                          }
                        >
                          <FormLabel>Lastname:</FormLabel>
                          <Input
                            type='text'
                            placeholder='Enter lastname'
                            {...field}
                          />
                          <FormErrorMessage>
                            {form.errors?.lastName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='email'>
                      {({ form, field }: any) => (
                        <FormControl
                          mt={6}
                          isInvalid={form.errors?.email && form.touched?.email}
                        >
                          <FormLabel>Email:</FormLabel>
                          <Input
                            type='email'
                            placeholder='test@test.com'
                            {...field}
                          />
                          <FormErrorMessage>
                            {form.errors?.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='password'>
                      {({ form, field }: any) => (
                        <FormControl
                          mt={6}
                          isInvalid={
                            form.errors?.password && form.touched?.password
                          }
                        >
                          <FormLabel>Password:</FormLabel>
                          <Input
                            type='password'
                            placeholder='*******'
                            {...field}
                          />
                          <FormErrorMessage>
                            {form.errors?.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='nickname'>
                      {({ form, field }: any) => (
                        <FormControl
                          mt={6}
                          isInvalid={
                            form.errors?.nickname && form.touched?.nickname
                          }
                        >
                          <FormLabel>Playdek Name:</FormLabel>
                          <Input
                            type='text'
                            placeholder='Enter Playdek Name'
                            {...field}
                          />
                          <FormErrorMessage>
                            {form.errors?.nickname}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='country'>
                      {({ form, field }: any) => (
                        <FormControl
                          mt={6}
                          isInvalid={
                            form.errors?.country && form.touched?.country
                          }
                        >
                          <FormLabel>Country:</FormLabel>
                          <Select placeholder='Choose a country' {...field}>
                            {countries.map((country, index) => (
                              <option key={index} value={country.value}>
                                {country.text}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors?.country}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Box textAlign={'center'}>
                      <Button
                        colorScheme='teal'
                        variant='outline'
                        width='36'
                        textAlign={'center'}
                        mt={6}
                        type='submit'
                      >
                        Sign Up
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Flex>
      </Container>
      <>{loader}</>
    </React.Fragment>
  );
};

export default SignUpView;
