import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { Header } from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import LogInView from './views/LogInView';
import SignUpView from './views/SignUpView';
import MainView from './views/MainView';
import ResetPasswordView from './views/ResetPasswordView';
import SetPasswordView from './views/SetPasswordView';
import PlayersTable from './components/PlayersTable';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Header />
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainView />} />
        <Route path={ROUTES.LOGIN} element={<LogInView />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpView />} />
        <Route path={ROUTES.PASSWORD_RESET} element={<ResetPasswordView />} />
        <Route path={ROUTES.PASSWORD_SET} element={<SetPasswordView />} />
        <Route path={ROUTES.STANDINGS} element={<PlayersTable />} />
      </Routes>
    </Router>
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}></VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
