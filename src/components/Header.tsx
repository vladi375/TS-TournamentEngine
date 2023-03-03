import React, { FC } from 'react';
import {
  Box,
  Flex,
  Link,
  Container,
  HStack,
  Button,
  useColorMode,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  Text,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Link as ReachLink, useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  selectUserName,
  selectUserLogged,
  logUserOut,
  selectUserIsAdmin,
} from '../store/userSlice';

type NavItemProperties = {
  children: any;
  to: string;
};

const NavItem: FC<NavItemProperties> = ({
  children,
  to = '/',
}): JSX.Element => {
  return (
    <Link as={ReachLink} to={to} style={{ textDecoration: 'none' }}>
      <Button variant='ghost'>{children}</Button>
    </Link>
  );
};

export const Header = () => {
  const { colorMode } = useColorMode();

  const isUserLoggedIn = useAppSelector(selectUserLogged);
  const userName = useAppSelector(selectUserName);
  const isAdmin = useAppSelector(selectUserIsAdmin);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box as='header' py={4} bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>
      <Container maxW={'container.xl'}>
        <Flex justifyContent={'space-between'}>
          <ColorModeSwitcher justifySelf='flex-start' />
          <HStack spacing={'36px'}>
            <NavItem to={ROUTES.HOME}>Home</NavItem>
            <NavItem to={ROUTES.RATING}>Rating</NavItem>
            <NavItem to={ROUTES.GAME_RESULTS}>Game results</NavItem>
            <NavItem to={ROUTES.SUBMIT_GAME_RESULT}>Submit form</NavItem>
            {isUserLoggedIn ? (
              <React.Fragment>
                <Menu>
                  <MenuButton>
                    <Avatar name={userName} size='sm'></Avatar>
                  </MenuButton>
                  <MenuList>
                    <Text pl={3}>
                      Signed in as <strong>{userName}</strong>
                    </Text>
                    <MenuDivider />
                    {isAdmin && (
                      <>
                        <MenuItem onClick={() => navigate(ROUTES.SIGNUP)}>
                          Add new player
                        </MenuItem>
                        <MenuDivider />
                      </>
                    )}
                    {isAdmin && (
                      <>
                        <MenuItem onClick={() => navigate(ROUTES.EDIT_PLAYER)}>
                          Edit player
                        </MenuItem>
                        <MenuDivider />
                      </>
                    )}
                    <MenuItem onClick={() => dispatch(logUserOut())}>
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem to={ROUTES.LOGIN}>Log in</NavItem>
              </React.Fragment>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
