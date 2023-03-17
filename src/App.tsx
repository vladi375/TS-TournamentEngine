import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header } from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import LogInView from './views/LogInView';
import SignUpView from './views/SignUpView';
import MainView from './views/MainView';
import ResetPasswordView from './views/ResetPasswordView';
import SetPasswordView from './views/SetPasswordView';
import PlayersRatingView from './views/PlayersRatingView';
import GameResultsView from './views/GameResultsView';
import SubmitForm from './views/SubmitForm';
import AuthorizedRouteGuard from './components/guards/AuthorizedRouteGuard';
import GameResultInfoView from './views/GameResultInfoView';
import ForbiddenPage from './views/ForbiddenView';
import AdminRouteGuard from './components/guards/AdminRouteGuard';
import EditPlayerView from './views/EditPlayerView';
import ErrorHandler from './components/ErrorHandler';
import NotFoundPage from './views/NotFoundView';
import EditGameResultView from './views/EditGameResultView';
import ToastHandler from './components/Toast';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Header />
      <ErrorHandler />
      <ToastHandler />
      <Routes>
        <Route path={ROUTES.HOME} element={<MainView />} />
        <Route path={ROUTES.LOGIN} element={<LogInView />} />
        <Route
          path={ROUTES.SIGNUP}
          element={<AdminRouteGuard element={<SignUpView />} />}
        />
        <Route path={ROUTES.PASSWORD_RESET} element={<ResetPasswordView />} />
        <Route path={ROUTES.PASSWORD_SET} element={<SetPasswordView />} />
        <Route path={ROUTES.RATING} element={<PlayersRatingView />} />
        <Route
          path={ROUTES.SUBMIT_GAME_RESULT}
          element={<AuthorizedRouteGuard element={<SubmitForm />} />}
        />
        <Route
          path={ROUTES.GAME_RESULT_EDIT}
          element={<AdminRouteGuard element={<EditGameResultView />} />}
        />
        <Route
          path={ROUTES.GAME_RESULT_INFO}
          element={<GameResultInfoView />}
        />
        <Route path={ROUTES.GAME_RESULTS} element={<GameResultsView />} />
        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route
          path={ROUTES.EDIT_PLAYER}
          element={<AdminRouteGuard element={<EditPlayerView />} />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
