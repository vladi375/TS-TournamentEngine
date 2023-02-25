import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CountryFlag from '../components/CountryFlag';
import Paginator from '../components/Paginator/Paginator';
import GameResultInfo from '../models/gameResultInfo';
import ConfirmationAlert from './../components/ConfirmationAlert';
import { getGameResults } from '../services/gameResultService';
import Power from '../enums/power';

const GameResultsView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameResults, setGameResults] = useState([] as GameResultInfo[]);
  const [totalPages, setTotalPages] = useState(0);

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? +pageParam : 1;

  useEffect(() => {
    (async () => {
      const results = await getGameResults(currentPage);

      setGameResults(results.items);
      setTotalPages(results.totalPages);
    })();
  }, [currentPage]);

  const handleGoToPage = (pageIndex: number) => {
    setSearchParams({ page: pageIndex.toString() });
  };

  const goToDetails = (id: number) => {
    navigate(`/result/${id}`);
  };

  return (
    <>
      <Container maxW={'container.lg'} my={14}>
        <Box p={12} borderWidth={1} borderRadius={8} boxShadow='lg'>
          <Grid templateColumns='repeat(3, 1fr)' gap={3}>
            {gameResults.map(result => (
              <GridItem key={result.id}>
                <Box
                  p={2}
                  borderWidth={1}
                  borderRadius={6}
                  boxShadow='lg'
                  cursor={'pointer'}
                  onClick={() => goToDetails(result.id)}
                >
                  <Flex justifyContent={'space-between'}>
                    <Text fontSize='0.6em' textColor={'gray.400'}>
                      Game #{result.id}
                    </Text>
                    {/* <HStack>
                      <IconButton
                        onClick={() => console.log('Edit')}
                        size={'1rem'}
                        icon={<EditIcon />}
                        aria-label='Edit Button'
                      ></IconButton>
                      <IconButton
                        onClick={() => console.log('Delete')}
                        size={'1rem'}
                        icon={<DeleteIcon />}
                        aria-label='Delete Button'
                      ></IconButton>
                    </HStack> */}
                  </Flex>
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
                  <Text ml={3}>vs</Text>
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
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Container>
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={handleGoToPage}
      />
      {/* <ConfirmationAlert
        isOpen={deleteDialogOpen}
        onClose={handleDelete}
        title='Delete game result'
        action='Delete'
        description="Are you sure, you want to delete this result? You can't undo this action afterwards and it will trigger history recalculation, which can be expensive?"
      /> */}
    </>
  );
};

export default GameResultsView;
