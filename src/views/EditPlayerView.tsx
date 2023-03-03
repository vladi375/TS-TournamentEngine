import React, { useState, useEffect } from 'react';
import {
  Container,
  Flex,
  Box,
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
import { countries } from '../constants';

import SelectOption from '../models/selectOption';
import PlayerModel from '../models/player';
import { getPlayers } from '../services/lookupService';

const EditPlayerView = () => {
  const [playersSelectOptions, setPlayersSelectOptions] = useState(
    new Array<SelectOption>()
  );

  const initialValues: PlayerModel = {
    player: '',
    firstName: '',
    lastName: '',
    email: '',
    nickname: '',
    country: '',
  };

  useEffect(() => {
    (async () => {
      const players = await getPlayers();

      document.addEventListener(
        'touchstart',
        (event: TouchEvent) => {
          event.stopPropagation();
        },
        true
      );

      setPlayersSelectOptions(players);
    })();
  }, []);

  return (
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
            <Heading mb={12} size='lg'>
              Edit player's profile information
            </Heading>
          </Box>
          <Box mt={4} textAlign='left'>
            <Formik
              initialValues={initialValues}
              validationSchema={SignUpValidationSchema}
              onSubmit={(values, actions) => {}}
            >
              {(props: FormikProps<PlayerModel>) => (
                <Form>
                  <Field name='playerBlueId'>
                    {({ form, field }: any) => (
                      <FormControl
                        mt={6}
                        mb={6}
                        isInvalid={
                          form.errors?.playerBlueId &&
                          form.touched?.playerBlueId
                        }
                      >
                        <FormLabel>Player:</FormLabel>
                        <Select placeholder='Select player' {...field}>
                          {playersSelectOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.value}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors?.playerBlueId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
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
                      //isLoading={isSignUpLoading ? props.isSubmitting : false}
                      type='submit'
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default EditPlayerView;
