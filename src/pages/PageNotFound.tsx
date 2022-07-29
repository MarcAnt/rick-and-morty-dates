import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { Logo } from "../assets/images";
import Footer from "../components/Footer";

const PageNotFound = () => {
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
        <Text as={"p"} color={"brand.secondary"}>
          Back to main
        </Text>
      </HStack>

      <Button variant={"outline"} width={"100%"} my={5}>
        Sign in
      </Button>
      <Button variant={"outline"} width={"100%"}>
        Sign Up
      </Button>

      <Footer />
    </Flex>
  );
};

export default PageNotFound;
