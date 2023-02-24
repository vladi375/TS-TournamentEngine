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
import Paginator from './Paginator/Paginator';
import useFullPageLoader from '../hooks/useFullPageLoader';
import CountryFlag from './CountryFlag';
import { useSearchParams } from 'react-router-dom';

interface PlayerModel {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  rating: number;
  rank: number;
}

const PlayersTable = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [searchParams, setSearchParams] = useSearchParams();

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
                  <Th>Player</Th>
                  <Th>Country</Th>
                  <Th>Rating</Th>
                  <Th>Rank</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((player: PlayerModel) => {
                  return (
                    <Tr key={player.id}>
                      <Td>
                        {player.firstName} {player.lastName}
                      </Td>
                      <Td>
                        <CountryFlag
                          countryCode={player.country}
                          width='1rem'
                        />
                      </Td>
                      <Td>{player.rating}</Td>
                      <Td>{player.rank}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Player</Th>
                  <Th>Country</Th>
                  <Th>Rating</Th>
                  <Th>Rank</Th>
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

export default PlayersTable;
