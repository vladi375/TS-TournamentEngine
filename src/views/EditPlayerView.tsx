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

import { EditPlayerValidationSchema } from '../services/validationSchema';
import { countries } from '../constants';

import SelectOption from '../models/selectOption';
import { getPlayers } from '../services/lookupService';
import {
  editSelectedPlayer,
  loadSelectedPlayer,
} from '../services/accountService';
import PlayerModel from '../models/player';
import { isEmpty } from 'lodash';
import useFullPageLoader from '../hooks/useFullPageLoader';
import { useToast } from '@chakra-ui/react';
import Error from '../components/Error';

interface ChoosePlayerModel {
  player: string;
}

interface InitialValuesAfterSelectModel {
  id: number;
  player: string;
  firstName: string;
  lastName: string;
  email: string;
  nickname: string;
  countryId: string;
}

const EditPlayerView = () => {
  const [playersSelectOptions, setPlayersSelectOptions] = useState(
    new Array<SelectOption>()
  );

  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [loadedPlayer, setLoadedPlayer] = useState({} as PlayerModel);
  const [initialValuesAfterSelect, setInitialValuesAfterSelect] = useState(
    {} as InitialValuesAfterSelectModel
  );
  const [errorMessage, setErrorMessage] = useState('');

  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const toast = useToast();

  const initialValues: ChoosePlayerModel = {
    player: '',
  };

  const handleChangeSelect = (field: any) => {
    setSelectedPlayer(field.value);
  };

  const handleSubmit = async (values: PlayerModel) => {
    try {
      showLoader();

      await editSelectedPlayer(values);

      toast({
        title: 'Changes saved',
        description: "The player's details updated",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      hideLoader();
    } catch (error: any) {
      // do error handling
      setErrorMessage(error.message);

      toast({
        title: 'Saving failed',
        description: 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const mapValuesBeforeRequest = (values: InitialValuesAfterSelectModel) => {
    const { player, ...restValues } = values;

    return restValues;
  };

  useEffect(() => {
    (async () => {
      const players = await getPlayers();

      setPlayersSelectOptions(players);
    })();
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedPlayer)) {
      (async () => {
        showLoader();
        const loadedPlayer = await loadSelectedPlayer(+selectedPlayer!);
        hideLoader();
        setLoadedPlayer(loadedPlayer);
        setInitialValuesAfterSelect({
          ...loadedPlayer,
          player: selectedPlayer,
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayer]);

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
              {isEmpty(loadedPlayer) ? (
                <Formik
                  key={1}
                  initialValues={initialValues}
                  onSubmit={() => {}}
                >
                  {(props: FormikProps<ChoosePlayerModel>) => (
                    <Form>
                      <Field name='player'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            mb={6}
                            isInvalid={
                              form.errors?.player && form.touched?.player
                            }
                          >
                            <FormLabel>Player:</FormLabel>
                            <Select
                              placeholder='Select player'
                              onChange={handleChangeSelect(field)}
                              {...field}
                            >
                              {playersSelectOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                  {option.value}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors?.player}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  key={'2'}
                  initialValues={initialValuesAfterSelect}
                  validationSchema={EditPlayerValidationSchema}
                  onSubmit={(values, actions) => {
                    handleSubmit(mapValuesBeforeRequest(values));
                  }}
                  enableReinitialize={true}
                >
                  {(props: FormikProps<InitialValuesAfterSelectModel>) => (
                    <Form>
                      <Field name='player'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            mb={6}
                            isInvalid={
                              form.errors?.player && form.touched?.player
                            }
                          >
                            <FormLabel>Player:</FormLabel>
                            <Select
                              placeholder='Select player'
                              onChange={handleChangeSelect(field)}
                              {...field}
                            >
                              {playersSelectOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                  {option.value}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors?.player}
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
                          Submit
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>
          </Box>
          {errorMessage && <Error error={errorMessage}></Error>}
        </Flex>
      </Container>
      <>{loader}</>
    </React.Fragment>
  );
};

export default EditPlayerView;
