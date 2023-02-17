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
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(20);

  const indexOfLastPlayerOnPage = currentPage * playersPerPage;
  const indexOfFirstPlayerOnPage = indexOfLastPlayerOnPage - playersPerPage;
  const currentPlayers = data.slice(
    indexOfFirstPlayerOnPage,
    indexOfLastPlayerOnPage
  );
  const totalPlayers = data?.length;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(totalPlayers / playersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    (async () => {
      const playersData = await getPlayersData();
      setData(playersData);
    })();
  }, []);

  return (
    <React.Fragment>
      <Container maxW={'container.lg'} my={14}>
        <Box p={12} borderWidth={1} borderRadius={8} boxShadow='lg'>
          <TableContainer>
            <Table variant='simple' size='lg'>
              <Thead>
                <Tr>
                  <Th>Player</Th>
                  <Th>Country</Th>
                  <Th>Rating</Th>
                  <Th>Rank</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPlayers.map((player: PlayerModel) => {
                  return (
                    <Tr key={player.id}>
                      <Td>
                        {player.firstName} {player.lastName}
                      </Td>
                      <Td>{player.country}</Td>
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
        playersPerPage={playersPerPage}
        totalPlayers={data.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </React.Fragment>
  );
};

export default PlayersTable;
