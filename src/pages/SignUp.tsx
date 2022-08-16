import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useNavigate, Link as ReactLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Logo, HeartLogo } from "../assets/images";
import { registerUser } from "../app/features/user/userActionsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserInfo } from "../models";

import { Footer } from "../components";

const UserScheme = z.object({
  name: z
    .string()
    .max(50, { message: "Must be 5 or fewer characters long" })
    .min(5, { message: "Must be 5 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const SignUp: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<UserInfo, "token">>({
    resolver: zodResolver(UserScheme),
  });

  const dispatch = useAppDispatch();
  const { loading, userInfo, error, success } = useAppSelector(
    (state) => state.user
  );

  const handleNavigate = (name: UserInfo["name"], email: UserInfo["email"]) => {
    navigate("/login", {
      state: {
        name,
        email,
      },
    });
  };

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) handleNavigate(userInfo.name, userInfo.email);

    // redirect authenticated user to profile screen
    if (userInfo.name) navigate("/");
  }, [navigate, userInfo, success]);

  const signup: SubmitHandler<Omit<UserInfo, "token">> = async (data) => {
    dispatch(registerUser({ ...data }));

    handleNavigate(data.name, data.email);
  };

  return (
    <Flex
      direction={"column"}
      justify="center"
      alignItems={"center"}
      maxW={"300px"}
      margin={"auto"}
    >
      <VStack spacing={5} w={"100%"}>
        <Image
          src={Logo}
          alt="Rick & Morty Logo green portal"
          my={5}
          width={"200px"}
        />

        <Text color={"white"} textAlign={"center"} my={10}>
          Select your favorites characters to match
        </Text>

        <Image
          src={HeartLogo}
          alt="Rick & Morty Logo heart"
          my={5}
          width={"50"}
        />
        <Box as={"form"} onSubmit={handleSubmit(signup)}>
          <Input
            variant={"outline"}
            type={"email"}
            placeholder={"Email"}
            {...register("email")}
            name={"email"}
            my={3}
            autoComplete={"off"}
            isInvalid={errors?.email?.message ? true : false}
            isRequired
          />
          {errors.email && (
            <Text
              mt={2}
              color={"brand.primary"}
              bg={"brand.secondary"}
              p={1}
              borderRadius={5}
            >
              {errors.email.message}
            </Text>
          )}

          <Input
            variant={"outline"}
            type={"text"}
            placeholder={"Name"}
            {...register("name")}
            autoComplete={"off"}
            isInvalid={errors?.name?.message ? true : false}
            isRequired
          />
          {errors.name && (
            <Text
              mt={2}
              color={"red.800"}
              bg={"brand.secondary"}
              p={1}
              borderRadius={5}
              textAlign={"center"}
              fontWeight={"bold"}
            >
              {errors.name.message}
            </Text>
          )}

          {error ? (
            <Alert status="error" mt={2} rounded={"lg"}>
              <AlertIcon />
              <AlertTitle color={"red.800"}>{error.toString()}</AlertTitle>
            </Alert>
          ) : null}

          <Button
            type="submit"
            variant={"outline"}
            width={"100%"}
            my={5}
            disabled={loading}
          >
            Register
          </Button>
        </Box>
      </VStack>

      <Text
        as="i"
        color={"brand.secondary"}
        textAlign={"center"}
        my={5}
        fontSize="xs"
      >
        *This app use The Rick & Morty API. Is only for educational purposes.
        Your data will be safe in another dimension.
      </Text>

      <HStack>
        <Text color={"brand.secondary"}>Already have an account? Please</Text>

        <Link
          as={ReactLink}
          to={"/login"}
          color={"brand.primary"}
          bg={"brand.secondary"}
          p={1}
          borderRadius={5}
          style={{ fontWeight: "bold" }}
        >
          login
        </Link>
      </HStack>

      <Footer />
    </Flex>
  );
};

export default SignUp;
