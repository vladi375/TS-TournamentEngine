import { Navigate, useNavigate } from 'react-router-dom';
import {
  Container,
  Flex,
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  // FormHelperText,
  Input,
  Button,
  HStack,
  Checkbox,
} from '@chakra-ui/react';

import {
  Formik,
  FormikProps,
  Form,
  Field,
  // FieldProps,
} from 'formik';
import { LogInValidationSchema } from '../services/validationSchema';
import { onLogInActionCreator } from '../store/LogIn/logInActions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ROUTES } from '../constants';
import {
  getLogInErrors,
  getLogInLoading,
  getUserLoggedIn,
} from '../store/LogIn/logInSelector';

export interface logInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LogInView = () => {
  const initialValues: logInFormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const changeRouteToSignUp = () => {
    navigate(ROUTES.SIGNUP);
  };

  const isLogInLoading = useAppSelector(getLogInLoading);
  const logInErrors = useAppSelector(getLogInErrors);
  const isUserLoggedIn = useAppSelector(getUserLoggedIn);

  return (
    <Container maxW={'container.md'} my={14}>
      <Flex align='center' justifyContent='center'>
        <Box
          p={12}
          width={'500px'}
          borderWidth={1}
          borderRadius={8}
          boxShadow='lg'
        >
          <Box textAlign='center'>
            <Heading mb={6} size='lg'>
              Log in to your account
            </Heading>
          </Box>
          <HStack spacing='4' justify='center'>
            <Text>Don't have an account?</Text>
            <Button
              variant='link'
              colorScheme='teal'
              onClick={changeRouteToSignUp}
            >
              Sign up
            </Button>
          </HStack>
          <Box mt={4} textAlign='left'>
            <Formik
              initialValues={initialValues}
              validationSchema={LogInValidationSchema}
              onSubmit={(values, actions) => {
                dispatch(onLogInActionCreator(values));
              }}
            >
              {(props: FormikProps<logInFormValues>) => (
                <Form>
                  <Field name='email'>
                    {({ form, field }: any) => (
                      <FormControl
                        mt={6}
                        isInvalid={form.errors?.email && form.touched?.email}
                      >
                        <FormLabel>Email:</FormLabel>
                        <Input
                          type='email'
                          placeholder='test@test.com'
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors?.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='password'>
                    {({ form, field }: any) => (
                      <FormControl
                        mt={6}
                        isInvalid={
                          form.errors?.password && form.touched?.password
                        }
                      >
                        <FormLabel>Password:</FormLabel>
                        <Input
                          type='password'
                          placeholder='*******'
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors?.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <HStack justify='space-between' pt={4}>
                    <Checkbox defaultChecked>Remember me</Checkbox>
                    <Button variant='link' colorScheme='teal' size='sm'>
                      Forgot password?
                    </Button>
                  </HStack>
                  {logInErrors && (
                    <Box mt={6} textAlign={'center'}>
                      <Text color={'red.500'}>{logInErrors}</Text>
                    </Box>
                  )}
                  <Box textAlign={'center'}>
                    <Button
                      colorScheme='teal'
                      variant='outline'
                      width='36'
                      textAlign={'center'}
                      mt={10}
                      isLoading={isLogInLoading ? props.isSubmitting : false}
                      type='submit'
                    >
                      Log In
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
      {isUserLoggedIn && <Navigate to={ROUTES.MAIN} />}
    </Container>
  );
};

export default LogInView;
