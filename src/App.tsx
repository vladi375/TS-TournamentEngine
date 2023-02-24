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
import GameResultsView from './views/GameResultsView';
import SubmitForm from './views/SubmitForm';
import AuthorizedRouteGuard from './components/AuthorizedRouteGuard';
import GameResult from './components/GameResultInfo';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<MainView />} />
        <Route path={ROUTES.LOGIN} element={<LogInView />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpView />} />
        <Route path={ROUTES.PASSWORD_RESET} element={<ResetPasswordView />} />
        <Route path={ROUTES.PASSWORD_SET} element={<SetPasswordView />} />
        <Route path={ROUTES.RATING} element={<PlayersTable />} />
        <Route
          path={ROUTES.SUBMIT_GAME_RESULT}
          element={<AuthorizedRouteGuard element={<SubmitForm />} />}
        />
        <Route path={ROUTES.GAME_RESULT_INFO} element={<GameResult />} />
        <Route path={ROUTES.GAME_RESULTS} element={<GameResultsView />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
