import React, { useState, useEffect } from 'react';
import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CountryFlag from '../components/CountryFlag';
import Paginator from '../components/Paginator/Paginator';
import { getGameResults } from '../services/gameResultService';
import Power from '../enums/power';
import GameResultInfoShort from '../models/gameResultInfoShort';
import useFullPageLoader from '../hooks/useFullPageLoader';

const GameResultsView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameResults, setGameResults] = useState([] as GameResultInfoShort[]);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? +pageParam : 1;

  useEffect(() => {
    (async () => {
      showLoader();

      const results = await getGameResults(currentPage);

      hideLoader();

      setGameResults(results.items);
      setTotalPages(results.totalPages);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleGoToPage = (pageIndex: number) => {
    setSearchParams({ page: pageIndex.toString() });
  };

  const goToDetails = (id: number) => {
    navigate(`/result/${id}`);
  };

  return (
    <React.Fragment>
      <Container maxW={'container.lg'} my={14}>
        <Box p={12} borderWidth={1} borderRadius={8} boxShadow='lg'>
          {gameResults.map(result => (
            <Box
              key={result.id}
              mb='2'
              p={2}
              borderWidth={1}
              borderRadius={6}
              boxShadow='lg'
              cursor={'pointer'}
              onClick={() => goToDetails(result.id)}
            >
              <Flex
                justifyContent={'space-between'}
                fontSize='0.6em'
                textColor={'gray.400'}
              >
                <Text>Game #{result.id}</Text>
                <Text>{result.tournamentName}</Text>
                <Text>{new Date(result.date).toLocaleDateString()}</Text>
              </Flex>
              <Flex>
                <HStack>
                  <CountryFlag
                    countryCode={result.playerBlueCountry}
                    width='1rem'
                  />
                  <Text
                    fontWeight={
                      result.winningPower === Power.USA ? 'bold' : 'normal'
                    }
                  >
                    {result.playerBlueName}
                  </Text>
                </HStack>
                <Text ml={3} mr='3'>
                  vs
                </Text>
                <HStack>
                  <CountryFlag
                    countryCode={result.playerRedCountry}
                    width='1rem'
                  />
                  <Text
                    fontWeight={
                      result.winningPower === Power.USSR ? 'bold' : 'normal'
                    }
                  >
                    {result.playerRedName}
                  </Text>
                </HStack>
              </Flex>
            </Box>
          ))}
        </Box>
      </Container>
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={handleGoToPage}
      />
      <>{loader}</>
    </React.Fragment>
  );
};

export default GameResultsView;
