import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiAliensFill } from "react-icons/ri";
import { FaHeart, FaSkull } from "react-icons/fa";
import { BiX } from "react-icons/bi";

const Card = () => {
  return (
    <Box
      bg={"white"}
      borderRadius={15}
      // overflow={"hidden"}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"stretch"}
      h={"450px"}
      maxH={"450px"}
      maxW={"600px"}
      margin={"1rem auto"}
      boxShadow={"0 5px 10px #00000052"}
      position={"relative"}
    >
      <Flex
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
      >
        <Image
          borderRadius="full"
          boxSize="200px"
          src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        />

        <Box
          position={"absolute"}
          borderRadius="full"
          borderWidth={5}
          borderColor={"brand.secondary"}
          bg={"brand.primary"}
          w={"60px"}
          h={"60px"}
          bottom={130}
          right={10}
        ></Box>
      </Flex>
      <Flex
        bg={"rgba(234, 88, 12, 0.5)"}
        direction={"column"}
        alignItems={"stretch"}
        justifyContent={"center"}
        flex={1}
        paddingLeft={5}
        borderRightRadius={15}
      >
        <Heading as={"h2"} color={"brand.primary"} mb={10} fontWeight={"bold"}>
          Rick Sanchez
        </Heading>

        <Stack>
          <HStack>
            <Icon as={RiAliensFill} w={7} h={7} color={"brand.primary"} />
            <Text as={"span"} color={"brand.secondary"} fontWeight={"bold"}>
              Human
            </Text>
          </HStack>
          <HStack>
            <Icon as={FaSkull} w={5} h={5} color={"brand.primary"} ml={1} />
            <Text as={"span"} color={"brand.secondary"} fontWeight={"bold"}>
              Alive
            </Text>
          </HStack>
        </Stack>
      </Flex>

      <Flex
        position={"absolute"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bottom={-10}
        gap={3}
      >
        <Box
          borderRadius="full"
          borderWidth={3}
          borderColor={"brand.secondary"}
          bg={"white"}
          w={"45px"}
          h={"45px"}
          transform={"translateX(-20%)"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
        >
          <Icon as={BiX} w={7} h={7} color={"brand.primary"} />
        </Box>
        <Box
          borderRadius="full"
          borderWidth={5}
          borderColor={"brand.secondary"}
          bg={"white"}
          w={"65px"}
          h={"65px"}
          transform={"translateX(-10%)"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
        >
          <Icon as={FaHeart} w={8} h={8} color={"brand.secondary"} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Card;
