import React, { useState, useEffect } from 'react';
import {
  Container,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';

import { Formik, FormikProps, Form, Field } from 'formik';

import { EditPlayerValidationSchema } from '../services/validationSchema';

import SelectOption from '../models/selectOption';
import { getCountries, getPlayers } from '../services/lookupService';
import Player from '../models/player';
import { isEmpty } from 'lodash';
import useFullPageLoader from '../hooks/useFullPageLoader';
import Error from '../components/Error';
import { editPlayer, getPLayer } from '../services/playerService';
import { useAppDispatch } from '../hooks/hooks';
import { displayToast } from '../store/toastSlice';

const EditPlayerView = () => {
  const [playersSelectOptions, setPlayersSelectOptions] = useState(
    new Array<SelectOption>()
  );

  const [countriesSelectOptions, setCountriesSelectOptions] = useState(
    new Array<SelectOption>()
  );

  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState({} as Player);
  const [errorMessage, setErrorMessage] = useState('');

  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: Player) => {
    showLoader();

    try {
      await editPlayer(values);
      dispatch(
        displayToast({
          title: 'Changes saved',
          description: "The player's details updated",
          status: 'success',
        })
      );
      hideLoader();
      setErrorMessage('');
    } catch (error: any) {
      hideLoader();
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const players = await getPlayers();
      const countries = await getCountries();

      setCountriesSelectOptions(countries);
      setPlayersSelectOptions(players);
    })();
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedPlayerId)) {
      (async () => {
        showLoader();
        const loadedPlayer = await getPLayer(+selectedPlayerId!);
        hideLoader();

        setSelectedPlayer({
          ...loadedPlayer,
          nickname: loadedPlayer.nickname ? loadedPlayer.nickname : '',
          email: loadedPlayer.email ? loadedPlayer.email : '',
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayerId]);

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
              <Heading mb={12} size='lg'>
                Edit player's profile information
              </Heading>
            </Box>
            <Box mt={4} textAlign='left'>
              <FormLabel>Player to edit:</FormLabel>
              <Select
                mb={4}
                placeholder='Select player'
                onChange={e => setSelectedPlayerId(e.target.value)}
                value={selectedPlayerId}
              >
                {playersSelectOptions.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.value}
                  </option>
                ))}
              </Select>
              {selectedPlayer.id && (
                <Formik
                  key={'2'}
                  initialValues={selectedPlayer}
                  validationSchema={EditPlayerValidationSchema}
                  onSubmit={(values, actions) => {
                    handleSubmit(values);
                  }}
                  enableReinitialize={true}
                >
                  {(props: FormikProps<Player>) => (
                    <Form>
                      <Field name='firstName'>
                        {({ form, field }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors?.firstName && form.touched?.firstName
                            }
                          >
                            <FormLabel>Firstname:</FormLabel>
                            <Input type='text' placeholder='' {...field} />
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
                            <Input type='text' placeholder='' {...field} />
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
                            isInvalid={
                              form.errors?.email && form.touched?.email
                            }
                          >
                            <FormLabel>Email:</FormLabel>
                            <Input type='email' {...field} />
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
                            <Input type='text' placeholder='' {...field} />
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
                              form.errors?.country && form.touched?.country
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
                              {form.errors?.country}
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
                          Submit
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>
          </Box>
        </Flex>
      </Container>
      <>{loader}</>
    </React.Fragment>
  );
};

export default EditPlayerView;
