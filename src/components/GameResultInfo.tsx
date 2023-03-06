import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  deleteGameResult,
  getGameResultInfo,
} from '../services/gameResultService';
import GameResultInfo from './../models/gameResultInfo';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Link,
  Text,
} from '@chakra-ui/react';
import CountryFlag from './CountryFlag';
import { selectUserIsAdmin } from './../store/userSlice';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import ConfirmationAlert from './ConfirmationAlert';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from './../constants/constants';
import useFullPageLoader from '../hooks/useFullPageLoader';
import { showNotFoundError } from '../store/errorSlice';

const GameResult = () => {
  let { id } = useParams();

  const [result, setResult] = useState({} as GameResultInfo);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const isAdmin = useAppSelector(selectUserIsAdmin);

  useEffect(() => {
    (async () => {
      if (!id || isNaN(+id) || +id < 1) {
        dispatch(showNotFoundError(true));
        return;
      }

      loadGameResult(+id!);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadGameResult = async (id: number) => {
    showLoader();
    const result = await getGameResultInfo(+id!);
    hideLoader();
    setResult(result);
  };

  const handleDelete = async (triggerAction: boolean) => {
    setDeleteAlert(false);

    if (!triggerAction) return;

    try {
      showLoader();
      await deleteGameResult(+id!);
      hideLoader();
      navigate(ROUTES.GAME_RESULTS);
    } catch (error) {
      // handle error
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = (id: number) => {
    navigate(ROUTES.GAME_RESULT_EDIT.replace(':id', id.toString()));
  };

  return (
    <>
      <Container maxW='3xl' my={14}>
        <Box p={12} borderWidth={1} borderRadius={8} boxShadow='lg'>
          {isAdmin && (
            <HStack justifyContent='space-between'>
              <Button colorScheme='black' variant='link' onClick={handleBack}>
                ⬅ Back
              </Button>
              <HStack justifyContent='flex-end'>
                <IconButton
                  bg='transparent'
                  onClick={() => handleEdit(result.id)}
                  size={'1rem'}
                  icon={<EditIcon />}
                  aria-label='Edit Button'
                ></IconButton>
                <IconButton
                  bg='transparent'
                  onClick={() => setDeleteAlert(true)}
                  size={'1rem'}
                  icon={<DeleteIcon />}
                  aria-label='Delete Button'
                ></IconButton>
              </HStack>
            </HStack>
          )}
          <Text fontSize='0.8em' textColor={'gray.400'} textAlign='center'>
            Game #{result.id}
          </Text>
          <Grid mt={2} templateColumns='5fr 0.1fr 5fr' gap={4}>
            <GridItem
              w='100%'
              display='flex'
              flexDir={'column'}
              alignItems='flex-end'
            >
              <HStack>
                <Text borderBottom='2px' borderBottomColor='blue.500'>
                  {result.playerBlueName}
                </Text>
                {result.id && (
                  <CountryFlag
                    countryCode={result.playerBlueCountry}
                    width='2em'
                  />
                )}
              </HStack>
              <HStack>
                <Flex alignItems={'center'}>
                  <Text color={'gray.400'} fontSize='0.8em'>
                    {result.playerBlueOldRating}
                  </Text>
                  {result.playerBlueNewRating > result.playerBlueOldRating ? (
                    <ChevronUpIcon color={'green.400'} />
                  ) : (
                    <ChevronDownIcon color={'red.400'} />
                  )}
                </Flex>
                <Text fontSize='0.8em'>{result.playerBlueNewRating}</Text>
              </HStack>
            </GridItem>
            <GridItem w='100%'>
              <Text textAlign='center'>vs</Text>
            </GridItem>
            <GridItem w='100%'>
              <HStack>
                {result.id && (
                  <CountryFlag
                    countryCode={result.playerRedCountry}
                    width='2em'
                  />
                )}
                <Text borderBottom='2px' borderBottomColor='red.500'>
                  {result.playerRedName}
                </Text>
              </HStack>
              <HStack>
                <Text fontSize='0.8em'>{result.playerRedNewRating}</Text>
                <Flex alignItems={'center'}>
                  {result.playerRedNewRating > result.playerRedOldRating ? (
                    <ChevronUpIcon color={'green.400'} />
                  ) : (
                    <ChevronDownIcon color={'red.400'} />
                  )}
                  <Text color={'gray.400'} fontSize='0.8em'>
                    {result.playerRedOldRating}
                  </Text>
                </Flex>
              </HStack>
            </GridItem>
          </Grid>
          <Grid mt={5} templateColumns='5fr 0.1fr 5fr' gap={4}>
            <GridItem>
              <Text textAlign={'right'}>Tournament:</Text>
              <Text mt={2} textAlign={'right'}>
                Identifier:
              </Text>
              <Text mt={2} textAlign={'right'}>
                Won by:
              </Text>
              <Text mt={2} textAlign={'right'}>
                In:
              </Text>
              <Text mt={2} textAlign={'right'}>
                Via:
              </Text>
              <Text mt={2} textAlign={'right'}>
                On:
              </Text>
              {result.linkToVideo && (
                <Text mt={2} textAlign={'right'}>
                  Video:
                </Text>
              )}
            </GridItem>
            <GridItem display='flex' justifyContent={'center'}>
              <Divider
                borderColor={'gray.400'}
                orientation='vertical'
              ></Divider>
            </GridItem>
            <GridItem>
              <Text>{result.tournamentName}</Text>
              <Text mt={2}>{result.identifier}</Text>
              <Flex mt={2} direction='column' justifyItems={'center'}>
                <Text>{result.winningPower ? result.winningPower : 'Tie'}</Text>
              </Flex>
              <Text mt={2}>{result.gameEndTurnName ?? 'N/A'}</Text>
              <Text mt={2}>{result.gameEndTypeName ?? 'N/A'}</Text>
              <Text mt={2}>{new Date(result.date).toLocaleDateString()}</Text>
              {result.linkToVideo && (
                <Text mt={2}>
                  <Link href={result.linkToVideo} isExternal>
                    <ExternalLinkIcon mx='2px' />
                  </Link>
                </Text>
              )}
            </GridItem>
          </Grid>
        </Box>
        {isAdmin && (
          <Box mt={3} p={3} borderWidth={1} borderRadius={8} boxShadow='lg'>
            {result.whatsAppMessage}
          </Box>
        )}
      </Container>
      <ConfirmationAlert
        isOpen={deleteAlert}
        onClose={handleDelete}
        title='Delete game result'
        action='Delete'
        description="Are you sure, you want to delete this result? You can't undo this action afterwards and it will trigger history recalculation, which can be long and resource consuming operation"
      />
      <>{loader}</>
    </>
  );
};

export default GameResult;
