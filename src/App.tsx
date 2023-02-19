import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header } from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import LogInView from './views/LogInView';
import SignUpView from './views/SignUpView';
import MainView from './views/MainView';
import ResetPasswordView from './views/ResetPasswordView';
import SetPasswordView from './views/SetPasswordView';
import PlayersTable from './components/PlayersTable';
import SubmitForm from './views/SubmitForm';
import AuthorizedRouteGuard from './components/AuthorizedRouteGuard';

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
        <Route
          path={ROUTES.SUBMIT_GAME_RESULT}
          element={<AuthorizedRouteGuard element={<SubmitForm />} />}
        />
      </Routes>
    </Router>
  </ChakraProvider>
);
