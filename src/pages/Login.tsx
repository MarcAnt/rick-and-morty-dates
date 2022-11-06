import { useEffect, FC } from "react";
import {
  Alert,
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

import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link as ReactLink, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@/models";

import { Logo, HeartLogo } from "@/assets/images";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { loginUser } from "@/app/features/user/userActionsSlice";
import { Footer } from "@/components";
import { UserScheme } from "@/models/User.scheme";

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Omit<UserInfo, "token" | "name">>({
    resolver: zodResolver(UserScheme),
  });

  const dispatch = useAppDispatch();
  const { loading, userInfo, error, token } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (userInfo.name) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (location.state !== null) {
      const { email } = location.state as UserInfo;
      setValue("email", email);
    }
  }, [location]);

  const login: SubmitHandler<Omit<UserInfo, "token" | "name">> = async (
    data
  ) => {
    dispatch(loginUser({ ...data }));
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
        <Box as={"form"} onSubmit={handleSubmit(login)}>
          <Input
            variant={"outline"}
            type={"email"}
            placeholder={"Email"}
            {...register("email")}
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
          {error ? (
            <Box>
              <Alert status="error" mt={2} rounded={"lg"}>
                <AlertIcon />
                <AlertTitle color={"red.800"}>{error.toString()}</AlertTitle>
              </Alert>
            </Box>
          ) : null}

          <Button
            type="submit"
            variant={"outline"}
            width={"100%"}
            my={5}
            disabled={loading}
          >
            Login
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
        *This app uses The Rick & Morty API. It is for educational purposes.
        Your data will be safe in another dimension.
      </Text>
      <HStack>
        <Text color={"brand.secondary"}>Don't have account? Please</Text>

        <Link
          as={ReactLink}
          to={"/signup"}
          color={"brand.primary"}
          bg={"brand.secondary"}
          p={1}
          borderRadius={5}
          style={{ fontWeight: "bold" }}
        >
          signup
        </Link>
      </HStack>

      <Footer />
    </Flex>
  );
};

export default Login;
