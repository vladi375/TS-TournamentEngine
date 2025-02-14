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
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Power from '../enums/power';
import SelectOption from '../models/selectOption';
import GameResult from '../models/gameResult';
import {
  getGameEndTurns,
  getGameEndTypes,
  getPlayers,
  getTournamentTypes,
} from '../services/lookupService';
import { SubmitGameResultValidationSchema } from '../services/validationSchema';
import Error from '../components/Error';
import { useSelector } from 'react-redux';
import { selectUserId } from '../store/userSlice';
import { submitGameResult } from '../services/gameResultService';
import useFullPageLoader from '../hooks/useFullPageLoader';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const SubmitForm = () => {
  const today = new Date().toISOString().substring(0, 10);

  const initialValues = {
    date: today,
    power: '',
    opposingPlayer: 0,
    tournamentId: 0,
    identifier: '',
    winningPower: '',
    gameEndTurnId: 0,
    gameEndTypeId: 0,
    linkToVideo: '',
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [loader, showLoader, hideLoader] = useFullPageLoader();

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

  const playerId = useSelector(selectUserId);
  const navigate = useNavigate();

  const handleSubmit = async (values: any, actions: any) => {
    const request: GameResult = {
      ...values,
      winningPower: values.winningPower !== 'Tie' ? values.winningPower : null,
      playerBlueId:
        values.power === Power.USA ? playerId : values.opposingPlayer,
      playerRedId:
        values.power === Power.USA ? values.opposingPlayer : playerId,
    };

    try {
      showLoader();
      await submitGameResult(request);
      hideLoader();
      navigate(ROUTES.GAME_RESULTS);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      showLoader();

      const players: SelectOption[] = await getPlayers();

      const tournaments: SelectOption[] = await getTournamentTypes();

      const gameEndTurns: SelectOption[] = await getGameEndTurns();

      const gameEndTypes: SelectOption[] = await getGameEndTypes();

      hideLoader();

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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Container maxW={'container.lg'} my={14}>
        <Flex width='full' align='center' justifyContent='center'>
          <Box
            p={12}
            maxWidth='700px'
            borderWidth={1}
            borderRadius={8}
            boxShadow='lg'
          >
            <Box textAlign='center'>
              <Heading mb={4} size='lg'>
                Submit your game result
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
                initialValues={initialValues}
                validationSchema={SubmitGameResultValidationSchema}
                onSubmit={(values, actions) => handleSubmit(values, actions)}
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
                            form.errors?.identifier && form.touched?.identifier
                          }
                        >
                          <FormLabel>
                            Check ID: For ITSL, RTSL ,OTSL and RATS , check it
                            in Schedule. French League: F000. LFTS: E000. Greek
                            League: G000. British League: U000. KTSL: K000. Liga
                            Portuguesa: P000. Euskal Liga: B000. Lliga Catalana:
                            C000. Dutch League: D000. Belgian League: B100.
                            Illinois League I000. Hong Kong Cup: H000. Italian
                            League I100. Polish League P100. Atlantic Coast
                            League: A000. Nordic Cup: N000. Texas League: T000.
                            Pacific League: P200. Canadian League : C100 .
                            Israel League I200 . Chinese League : C200 Any other
                            game: 0000.
                          </FormLabel>
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
                    <Field name='power'>
                      {({ form, field }: any) => (
                        <FormControl
                          mt={6}
                          isInvalid={form.errors?.power && form.touched?.power}
                        >
                          <FormLabel>You played as</FormLabel>
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
                            </Stack>
                          </RadioGroup>
                          <FormErrorMessage>
                            {form.errors?.power}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='opposingPlayer'>
                      {({ form, field }: any) => (
                        <FormControl
                          mt={6}
                          isInvalid={
                            form.errors?.opposingPlayer &&
                            form.touched?.opposingPlayer
                          }
                        >
                          <FormLabel>Your opponent was:</FormLabel>
                          <Select placeholder='Choose your opponent' {...field}>
                            {playersSelectOptions.map((option, index) => (
                              <option key={index} value={option.id}>
                                {option.value}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors?.opposingPlayer}
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
                              <Radio {...field} colorScheme='gray' value='Tie'>
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
                          <Select placeholder='Choose game end turn' {...field}>
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
                          <Select placeholder='Choose game end type' {...field}>
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
                          <FormLabel>When did you play this game?</FormLabel>
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
      <>{loader}</>
    </React.Fragment>
  );
};

export default SubmitForm;
