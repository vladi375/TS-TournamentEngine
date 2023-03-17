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
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Power from '../enums/power';
import SelectOption from '../models/selectOption';
import { editGameResult, getGameResult } from '../services/gameResultService';
import {
  getGameEndTurns,
  getGameEndTypes,
  getPlayers,
  getTournamentTypes,
} from '../services/lookupService';
import { EditGameResultValidationSchema } from '../services/validationSchema';
import Error from '../components/Error';
import useFullPageLoader from '../hooks/useFullPageLoader';
import { isEqual } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';
import { setErrorCode } from '../store/errorSlice';
import GameResult from '../models/gameResult';
import BackNavigationButton from '../components/BackNavigationButton';
import HttpStatusCode from './../enums/httpStatusCode';
import { ROUTES } from '../constants';

const EditGameResultView = () => {
  const [playersSelectOptions, setPlayersSelectOptions] = useState(
    new Array<SelectOption>()
  );

  const [tournamentsSelectOptions, setTournamentsSelectOptions] = useState(
    new Array<SelectOption>()
  );

  const [gameEndTurnSelectOptions, setGameEndTurnSelectOptions] = useState(
    new Array<SelectOption>()
  );

  const [gameEndTypeSelectOptions, setGameEndTypeSelectOptions] = useState(
    new Array<SelectOption>()
  );

  const [result, setResult] = useState({} as GameResult);

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    (async () => {
      if (!id || isNaN(+id) || +id < 1) {
        dispatch(setErrorCode(HttpStatusCode.NotFound));
        return;
      }

      showLoader();

      const players = await getPlayers();

      const tournaments = await getTournamentTypes();

      const gameEndTurns = await getGameEndTurns();

      const gameEndTypes = await getGameEndTypes();

      const result = await getGameResult(+id);

      document.addEventListener(
        'touchstart',
        (event: TouchEvent) => {
          event.stopPropagation();
        },
        true
      );

      setPlayersSelectOptions(players);
      setTournamentsSelectOptions(tournaments);
      setGameEndTurnSelectOptions(gameEndTurns);
      setGameEndTypeSelectOptions(gameEndTypes);
      setResult({
        ...result,
        winningPower: result.winningPower ? result.winningPower : 'Tie',
        date: new Date(result.date).toISOString().substring(0, 10),
        linkToVideo: result.linkToVideo ? result.linkToVideo : '',
      });

      hideLoader();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values: any) => {
    showLoader();

    try {
      await editGameResult(values);
      navigate(ROUTES.GAME_RESULT_INFO.replace(':id', id!));
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    hideLoader();
  };

  return (
    <React.Fragment>
      {result.id && (
        <Container maxW={'container.lg'} my={14}>
          <Flex width='full' align='center' justifyContent='center'>
            <Box
              p={12}
              maxWidth='700px'
              borderWidth={1}
              borderRadius={8}
              boxShadow='lg'
            >
              <HStack justifyContent='space-between'>
                <BackNavigationButton />
              </HStack>
              <Box textAlign='center'>
                <Heading mb={4} size='lg'>
                  Edit game result
                </Heading>
              </Box>
              <Box textAlign='center' mb={8}>
                <Text>
                  Please use this form to report the result of a game. You can
                  report results for games only, where you have participated at.
                </Text>
              </Box>
              <Box mt={4} textAlign='left'>
                <Formik
                  initialValues={result}
                  validationSchema={EditGameResultValidationSchema}
                  onSubmit={(values, actions) => handleSubmit(values)}
                >
                  {(props: any) => (
                    <Form>
                      <Field name='tournamentId'>
                        {({ form, field }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors?.tournamentId &&
                              form.touched?.tournamentId
                            }
                          >
                            <FormLabel>Select type of the game:</FormLabel>
                            <Select placeholder='Choose tournament' {...field}>
                              {tournamentsSelectOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                  {option.value}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors?.tournamentId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='identifier'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            isInvalid={
                              form.errors?.identifier &&
                              form.touched?.identifier
                            }
                          >
                            <FormLabel>Check ID:</FormLabel>
                            <Input
                              placeholder='Game identifier'
                              type='text'
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors?.identifier}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='playerBlueId'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            isInvalid={
                              form.errors?.playerBlueId &&
                              form.touched?.playerBlueId
                            }
                          >
                            <FormLabel>USA Player:</FormLabel>
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
                      <Field name='playerRedId'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            isInvalid={
                              form.errors?.playerRedId &&
                              form.touched?.playerRedId
                            }
                          >
                            <FormLabel>USSR Player:</FormLabel>
                            <Select placeholder='Select player' {...field}>
                              {playersSelectOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                  {option.value}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors?.playerRedId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='winningPower'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            isInvalid={
                              form.errors?.winningPower &&
                              form.touched?.winningPower
                            }
                          >
                            <FormLabel>Who was the winning side?</FormLabel>
                            <RadioGroup {...field}>
                              <Stack spacing={5} direction='row'>
                                <Radio
                                  {...field}
                                  colorScheme='blue'
                                  value={Power.USA}
                                >
                                  USA
                                </Radio>
                                <Radio
                                  {...field}
                                  colorScheme='red'
                                  value={Power.USSR}
                                >
                                  USSR
                                </Radio>
                                <Radio
                                  {...field}
                                  colorScheme='gray'
                                  value='Tie'
                                >
                                  Tie
                                </Radio>
                              </Stack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors?.winningPower}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='gameEndTurnId'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            isInvalid={
                              form.errors?.gameEndTurnId &&
                              form.touched?.gameEndTurnId
                            }
                          >
                            <FormLabel>When did the game end?</FormLabel>
                            <Select
                              placeholder='Choose game end turn'
                              {...field}
                            >
                              {gameEndTurnSelectOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                  {option.value}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors?.gameEndTurnId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='gameEndTypeId'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            isInvalid={
                              form.errors?.gameEndTypeId &&
                              form.touched?.gameEndTypeId
                            }
                          >
                            <FormLabel>How did the game end?</FormLabel>
                            <Select
                              placeholder='Choose game end type'
                              {...field}
                            >
                              {gameEndTypeSelectOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                  {option.value}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors?.gameEndTypeId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='date'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            isInvalid={form.errors?.date && form.touched?.date}
                          >
                            <FormLabel>When was the game played?</FormLabel>
                            <Input
                              placeholder='Select Date'
                              type='date'
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors?.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='linkToVideo'>
                        {({ form, field }: any) => (
                          <FormControl
                            mt={6}
                            isInvalid={
                              form.errors?.linkToVideo &&
                              form.touched?.linkToVideo
                            }
                          >
                            <FormLabel>Link to Video</FormLabel>
                            <Input
                              placeholder='Link to video'
                              type='text'
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors?.linkToVideo}
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
                          isDisabled={isEqual(
                            props.initialValues,
                            props.values
                          )}
                          type='submit'
                        >
                          Update
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Flex>
        </Container>
      )}
      <>{loader}</>
    </React.Fragment>
  );
};

export default EditGameResultView;
