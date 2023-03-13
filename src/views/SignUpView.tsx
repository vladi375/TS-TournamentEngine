import React, { useEffect, useState } from 'react';
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
  Input,
  Button,
  Select,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';

import { Formik, Form, Field } from 'formik';

import { SignUpValidationSchema } from '../services/validationSchema';
import { ROUTES } from '../constants';

import { useAppSelector } from '../hooks/hooks';
import { selectUserIsAdmin } from './../store/userSlice';
import useFullPageLoader from '../hooks/useFullPageLoader';
import { addPlayer } from '../services/playerService';
import Error from '../components/Error';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import SelectOption from '../models/selectOption';
import { getCountries } from '../services/lookupService';

const SignUpView = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    countryId: '',
  };

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const isAdmin = useAppSelector(selectUserIsAdmin);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [countriesSelectOptions, setCountriesSelectOptions] = useState(
    new Array<SelectOption>()
  );

  useEffect(() => {
    (async () => {
      const countries = await getCountries();

      setCountriesSelectOptions(countries);
    })();
  }, []);

  const handleSubmit = async (values: any) => {
    showLoader();

    try {
      await addPlayer({ ...values });
      hideLoader();
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      hideLoader();
      setErrorMessage(error.message);
    }
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
                {(props: any) => (
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
                    {/* <Field name='password'>
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
                                  aria-label='show/hide confirm password'
                                  icon={
                                    showPassword ? (
                                      <ViewOffIcon />
                                    ) : (
                                      <ViewIcon />
                                    )
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
                    </Field> */}
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
                    <Field name='countryId'>
                      {({ form, field }: any) => (
                        <FormControl
                          mt={6}
                          isInvalid={
                            form.errors?.countryId && form.touched?.countryId
                          }
                        >
                          <FormLabel>Country:</FormLabel>
                          <Select placeholder='Choose a country' {...field}>
                            {countriesSelectOptions.map((country, index) => (
                              <option key={index} value={country.id}>
                                {country.value}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors?.countryId}
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
