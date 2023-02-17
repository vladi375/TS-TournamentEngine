import { Navigate, useNavigate } from "react-router-dom";
import {
  Container,
  Flex,
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  HStack,
  Checkbox,
} from "@chakra-ui/react";

import { Formik, FormikProps, Form, Field } from "formik";
import { LogInValidationSchema } from "../services/validationSchema";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ROUTES } from "../constants";
import LoginRequest from "../models/loginRequest";
import { useState } from "react";
import { login } from "../services/accountService";
import Error from "../components/Error";
import { userLoggedIn } from "../store/userSlice";
import { selectUserLogged } from "./../store/userSlice";

export const LogInView = () => {
  const initialValues: LoginRequest = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const navigate = useNavigate();

  const changeRouteToSignUp = () => {
    navigate(ROUTES.SIGNUP);
  };

  const changeRouteToResetPassword = () => {
    navigate(ROUTES.PASSWORD_RESET);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isUserLoggedIn = useAppSelector(selectUserLogged);
  const dispatch = useAppDispatch();

  const handleSubmit = async (value: LoginRequest) => {
    setIsLoading(true);

    try {
      const user = await login(value);
      setErrorMessage("");
      dispatch(userLoggedIn({ ...user }));
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <Container maxW={"container.md"} my={14}>
      <Flex align="center" justifyContent="center">
        <Box
          p={12}
          width={"500px"}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading mb={6} size="lg">
              Log in to your account
            </Heading>
          </Box>
          <HStack spacing="4" justify="center">
            <Text>Don't have an account?</Text>
            <Button
              variant="link"
              colorScheme="teal"
              onClick={changeRouteToSignUp}
            >
              Sign up
            </Button>
          </HStack>
          <Box mt={4} textAlign="left">
            <Formik
              initialValues={initialValues}
              validationSchema={LogInValidationSchema}
              onSubmit={async (values) => handleSubmit(values)}
            >
              {(props: FormikProps<LoginRequest>) => (
                <Form>
                  <Field name="email">
                    {({ form, field }: any) => (
                      <FormControl
                        mt={6}
                        isInvalid={form.errors?.email && form.touched?.email}
                      >
                        <FormLabel>Email:</FormLabel>
                        <Input
                          type="email"
                          placeholder="test@test.com"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors?.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ form, field }: any) => (
                      <FormControl
                        mt={6}
                        isInvalid={
                          form.errors?.password && form.touched?.password
                        }
                      >
                        <FormLabel>Password:</FormLabel>
                        <Input
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors?.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <HStack justify="space-between" pt={4}>
                    <Field name="rememberMe">
                      {({ form, field }: any) => (
                        <FormControl>
                          <Checkbox {...field}>Remember me</Checkbox>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      variant="link"
                      colorScheme="teal"
                      size="sm"
                      onClick={changeRouteToResetPassword}
                    >
                      Forgot password?
                    </Button>
                  </HStack>
                  {errorMessage && <Error error={errorMessage}></Error>}
                  <Box textAlign={"center"}>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      width="36"
                      textAlign={"center"}
                      mt={10}
                      isLoading={isLoading ? props.isSubmitting : false}
                      type="submit"
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
