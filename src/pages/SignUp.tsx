import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { Logo, HeartLogo } from "../assets/images";
import Footer from "../components/Footer";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const SignUp = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const signup = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;

    try {
      await supabase.auth.signUp(
        {
          email,
          password: uuidv4(),
        },
        {
          data: {
            name: nameRef.current?.value,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
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
          Select your favorites characters to date and match
        </Text>

        <Image
          src={HeartLogo}
          alt="Rick & Morty Logo heart"
          my={5}
          width={"50"}
        />
        <Box as={"form"} onSubmit={signup}>
          <Input
            variant={"outline"}
            type={"email"}
            placeholder={"Email"}
            ref={emailRef}
            my={3}
            isRequired
          />

          <Input
            variant={"outline"}
            type={"text"}
            placeholder={"Name"}
            ref={nameRef}
            isRequired
          />

          <Button type="submit" variant={"outline"} width={"100%"} my={5}>
            Sign Up
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

      {/* <VStack w={"100%"}>
        <Button
          backgroundColor={"white"}
          width={"100%"}
          boxShadow={
            "inset 5px 0px 0px #FBBC05, inset 0px -5px 0px #34A853, inset 0px 5px 0px #EA4335, inset -5px 0px 0px #4285F4;"
          }
          _hover={{ bgColor: "white" }}
          _active={{ bgColor: "white" }}
        >
          <Icon as={AiOutlineGoogle} color={"brand.secondary"} w={6} h={6} />
        </Button>
        <Button
          variant={"outline"}
          backgroundColor={"white"}
          width={"100%"}
          borderWidth={"5"}
          color={"brand.secondary"}
          borderColor={"brand.secondary"}
          _hover={{ bgColor: "white" }}
        >
          Sing in
        </Button>
      </VStack> */}

      <Footer />
    </Flex>
  );
};

export default SignUp;
