import React, { useState, useEffect } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Box,
} from '@chakra-ui/react';
import { getPlayersData } from '../services/playerService';
import Paginator from '../components/Paginator/Paginator';
import useFullPageLoader from '../hooks/useFullPageLoader';
import CountryFlag from '../components/CountryFlag';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';
import { setErrorCode } from '../store/errorSlice';

interface PlayerModel {
  id: number;
  firstName: string;
  lastName: string;
  countryId: string;
  rating: number;
  rank: number;
}

const PlayersRatingView = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? +pageParam : 1;

  const getPlayersDataAndSetPlayers = async (pageNumber: number) => {
    showLoader();
    const playersData = await getPlayersData(pageNumber);
    setData(playersData?.items);
    setTotalPages(playersData?.totalPages);
    hideLoader();
  };

  const paginate = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  useEffect(() => {
    if (isNaN(currentPage) || currentPage < 1) {
      dispatch(setErrorCode(true));
      return;
    }

    getPlayersDataAndSetPlayers(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <React.Fragment>
      <Container maxW={'container.lg'} my={14}>
        <Box p={12} borderWidth={1} borderRadius={8} boxShadow='lg'>
          <TableContainer>
            <Table variant='simple' size='sm'>
              <Thead>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Player</Th>
                  <Th>Country</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((player: PlayerModel) => {
                  return (
                    <Tr key={player.id}>
                      <Td>{player.rank}.</Td>
                      <Td>
                        {player.firstName} {player.lastName}
                      </Td>
                      <Td>
                        <CountryFlag
                          countryCode={player.countryId}
                          width='1rem'
                        />
                      </Td>
                      <Td>{player.rating}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Player</Th>
                  <Th>Country</Th>
                  <Th>Rating</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={paginate}
      />
      <>{loader}</>
    </React.Fragment>
  );
};

export default PlayersRatingView;
