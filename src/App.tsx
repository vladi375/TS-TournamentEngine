import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { Header } from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import LogInView from './views/LogInView';
import SignUpView from './views/SignUpView';
import MainView from './views/MainView';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path={ROUTES.MAIN} element={<MainView />} />
          <Route path={ROUTES.LOGIN} element={<LogInView />} />
          <Route path={ROUTES.SIGNUP} element={<SignUpView />} />
          <Route path={ROUTES.ABOUT} element={'About'} />
          <Route path={ROUTES.CONTACTS} element={'Contacts'} />
        </Routes>
      </Router>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='100vh' p={3}>
          <VStack spacing={8}></VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  </Provider>
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
