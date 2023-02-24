import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getGameResult } from '../services/gameResultService';
import GameResultInfo from './../models/gameResultInfo';
import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Link,
  Text,
} from '@chakra-ui/react';
import CountryFlag from './CountryFlag';
import Power from '../enums/power';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const GameResult = () => {
  // can be null, add handling for this
  const { id } = useParams();

  const [result, setResult] = useState({} as GameResultInfo);

  useEffect(() => {
    (async () => {
      const result = await getGameResult(+id!);
      setResult(result);
    })();
  }, [id]);

  return (
    <Container maxW='3xl' my={14}>
      <Box p={12} borderWidth={1} borderRadius={8} boxShadow='lg'>
        <Text fontSize='0.8em' textColor={'gray.400'} textAlign='center'>
          Game #{result.id}
        </Text>
        <Grid mt={2} templateColumns='5fr 0.1fr 5fr' gap={4}>
          <GridItem w='100%' display='flex' justifyContent='flex-end'>
            <HStack>
              <Text>{result.playerBlueName}</Text>
              <CountryFlag countryCode='US' width='2em' />
            </HStack>
          </GridItem>
          <GridItem w='100%'>
            <Text textAlign='center'>vs</Text>
          </GridItem>
          <GridItem w='100%'>
            <HStack>
              <CountryFlag countryCode='SU' width='2em' />
              <Text>{result.playerRedName}</Text>
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
            <Divider borderColor={'gray.400'} orientation='vertical'></Divider>
          </GridItem>
          <GridItem>
            <Text>{result.tournamentName}</Text>
            <Text mt={2}>{result.identifier}</Text>
            <Flex mt={2} direction='column' justifyItems={'center'}>
              <CountryFlag
                countryCode={result.winningPower === Power.USA ? 'US' : 'SU'}
                width='2em'
              />
            </Flex>
            <Text mt={2.5}>{result.gameEndTurnName}</Text>
            <Text mt={2}>{result.gameEndTypeName}</Text>
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
    </Container>
  );
};

export default GameResult;
