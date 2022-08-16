import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { Logo } from "../assets/images";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { Footer } from "../components";

const PageNotFound = () => {
  let navigate = useNavigate();

  const logOut = () => {
    navigate("/login", { replace: true });
  };
  const signUp = () => {
    navigate("/signup", { replace: true });
  };

  return (
    <Flex
      direction={"column"}
      justify="center"
      alignItems={"center"}
      maxW={"300px"}
      margin={"auto"}
    >
      <Image
        src={Logo}
        alt="Rick & Morty Logo green portal"
        my={5}
        width={"200px"}
      />
      <Heading as={"h2"} color={"brand.secondary"} textAlign={"center"} my={5}>
        Error 404
      </Heading>

      <Image
        src="https://c.tenor.com/U_WzyyQU_AEAAAAd/mr-meeseeks-rick-and-morty.gif"
        alt="Page not found"
        width={"200px"}
      />

      <HStack mt={10} alignSelf="flex-end">
        <Icon as={BsArrowLeft} w={6} h={6} color={"brand.secondary"} />
        <Link as={ReactLink} color={"brand.secondary"} to={"/"}>
          Back to main
        </Link>
        {/* <Text as={"p"} color={"brand.secondary"}>
        </Text> */}
      </HStack>

      <Button variant={"outline"} width={"100%"} my={5} onClick={signUp}>
        Sign up
      </Button>
      {/* <Button variant={"outline"} width={"100%"}>
        Sign Up
      </Button> */}
      <Button variant={"outline"} width={"100%"} onClick={logOut}>
        Login
      </Button>

      <Footer />
    </Flex>
  );
};

export default PageNotFound;
