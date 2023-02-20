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
  const [playersPerPage] = useState(100);
  const [totalPages, setTotalPages] = useState(0);

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const totalPlayers = playersPerPage * totalPages;

  const getPlayersDataAndSetPlayers = async (pageNumber: number) => {
    showLoader();
    const playersData = await getPlayersData(pageNumber);
    setData(playersData?.items);
    hideLoader();
  };

  const getTotalPages = async () => {
    const data = await getPlayersData(1);
    setTotalPages(data.totalPages);
  };

  const paginate = (pageNumber: number) => {
    getPlayersDataAndSetPlayers(pageNumber);
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      getPlayersDataAndSetPlayers(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(totalPlayers / playersPerPage)) {
      getPlayersDataAndSetPlayers(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getPlayersDataAndSetPlayers(currentPage);
    getTotalPages();
    // eslint-disable-next-line
  }, []);

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
        totalPages={totalPages}
        playersPerPage={playersPerPage}
        totalPlayers={totalPlayers}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
      <>{loader}</>
    </React.Fragment>
  );
};

export default PlayersTable;
