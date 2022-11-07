import React, { FC } from 'react';
import {
  Box,
  Flex,
  Link,
  Container,
  HStack,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Link as ReachLink } from 'react-router-dom';

import { ROUTES } from '../constants';
import { useAppSelector } from '../hooks/hooks';
import { getUserEmail, getUserSignedUp } from '../store/SignUp/signUpSelector';

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

  const isUserSignedUp = useAppSelector(getUserSignedUp);
  const userEmail = useAppSelector(getUserEmail);

  return (
    <Box as='header' py={4} bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>
      <Container maxW={'container.xl'}>
        <Flex justifyContent={'space-between'}>
          <ColorModeSwitcher justifySelf='flex-start' />
          <HStack spacing={'36px'}>
            <NavItem to={ROUTES.MAIN}>Main</NavItem>
            <NavItem to={ROUTES.ABOUT}>About</NavItem>
            <NavItem to={ROUTES.CONTACTS}>Contacts</NavItem>
            {isUserSignedUp ? (
              <React.Fragment>
                <NavItem to={ROUTES.MAIN}>{userEmail}</NavItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem to={ROUTES.LOGIN}>Log in</NavItem>
                <NavItem to={ROUTES.SIGNUP}>Sign up</NavItem>
              </React.Fragment>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
