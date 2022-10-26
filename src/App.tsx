import * as React from 'react';
import {
  ChakraProvider,
  Box,  
  VStack,  
  Grid,
  theme,
} from '@chakra-ui/react';
import { Header } from './components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,  
} from 'react-router-dom';
import { ROUTES } from './constants';
import LogInView  from './views/LogInView';
import SignUpView from './views/SignUpView';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
        <Header />
        <Routes>
          <Route path={ROUTES.MAIN} element={<LogInView/>} />
          <Route path={ROUTES.LOGIN} element={<LogInView/>} />
          <Route path={ROUTES.SIGNUP} element={<LogInView/>} />
          <Route path={ROUTES.ABOUT} element={<SignUpView/>} />
          <Route path={ROUTES.CONTACTS} element={<SignUpView/>} />
        </Routes>
    </Router>  
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>        
        <VStack spacing={8}>          
        </VStack>
      </Grid>
    </Box>    
  </ChakraProvider>
);
