import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiAliensFill } from "react-icons/ri";
import { FaHeart, FaSkull } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import {
  fetchCharacters,
  getMatches,
  setMatches,
} from "../app/features/user/charactersSlice";
import { useAppDispatch } from "../app/store";
import { CharacterInfo } from "../models";
import { NoImage } from "../assets/images";
import { randomNum } from "../utilities";

const Card: React.FC<any> = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [character, setCharacter] = useState<CharacterInfo>();
  const [isNextMatch, setIsNextMatch] = useState(false);

  const dispatch = useAppDispatch();
  const currentCharacter = useAppSelector(
    (state) => state.characters.currentCharacter
  );

  useEffect(() => {
    dispatch(fetchCharacters(randomNumber));
  }, [randomNumber]);

  useEffect(() => {
    if (currentCharacter) {
      setCharacter(currentCharacter);
    }
  }, [currentCharacter, character]);

  const createRandomPage = () => {
    const pagesTotal = 42;

    setRandomNumber(randomNum(pagesTotal));
  };

  const handleMatches = async () => {
    try {
      const matched = randomNum(character ? character?.id : 10) % 2 === 0;

      const characterMatches = { ...character, isMatch: matched };

      dispatch(setMatches(characterMatches));
      setIsNextMatch(true);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          createRandomPage();

          resolve(setIsNextMatch(false));
        }, 2000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const noMatches = async () => {
    createRandomPage();
  };

  return (
    <Box
      bg={"white"}
      borderRadius={15}
      display={"flex"}
      flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }}
      justifyContent={"space-evenly"}
      alignItems={"stretch"}
      h={"450px"}
      maxH={"450px"}
      maxW={"600px"}
      margin={{ xs: "1rem 2rem", sm: "1rem 2rem", md: "1rem auto" }}
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
          // src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          src={character?.image ? character.image : NoImage}
          alt={character?.name ? character.name : "No image"}
        />
        <Box
          position={"absolute"}
          borderRadius="full"
          borderWidth={5}
          borderColor={"brand.secondary"}
          bg={"brand.primary"}
          w={"60px"}
          h={"60px"}
          bottom={{ xs: "10px", sm: "10px", md: "130px" }}
          transform="translateX(80px)"
        ></Box>
      </Flex>
      <Flex
        bg={"rgba(234, 88, 12, 0.5)"}
        direction={"column"}
        alignItems={{ xs: "center", sm: "center", md: "stretch" }}
        justifyContent={"center"}
        flex={1}
        paddingLeft={5}
        borderBottomRightRadius={15}
        borderTopRightRadius={{ xs: 0, sm: 0, md: 15 }}
        borderBottomLeftRadius={{ xs: 15, sm: 15, md: 0 }}
      >
        <Heading as={"h2"} color={"brand.primary"} mb={10} fontWeight={"bold"}>
          {character?.name ? character.name : ""}
        </Heading>

        <Stack>
          <HStack>
            <Icon as={RiAliensFill} w={7} h={7} color={"brand.primary"} />
            <Text as={"span"} color={"brand.secondary"} fontWeight={"bold"}>
              {character?.species ? character.species : ""}
            </Text>
          </HStack>
          <HStack>
            <Icon as={FaSkull} w={5} h={5} color={"brand.primary"} ml={1} />
            <Text as={"span"} color={"brand.secondary"} fontWeight={"bold"}>
              {character?.status ? character.status : ""}
            </Text>
          </HStack>
        </Stack>
      </Flex>

      <Flex
        position={"absolute"}
        direction={{ xs: "row", sm: "row", md: "column" }}
        justifyContent={"center"}
        alignItems={"center"}
        bottom={-10}
        left={{ xs: "calc(50% - 33px)", sm: "calc(50% - 33px)" }}
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
          onClick={noMatches}
        >
          <Icon as={BiX} w={7} h={7} color={"brand.primary"} />
        </Box>
        <Button
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
          variant={"ghost"}
          onClick={handleMatches}
          isDisabled={isNextMatch}
          _hover={{
            bg: "white",
          }}
          _active={{
            bg: "white",
          }}
        >
          <Icon as={FaHeart} w={8} h={8} color={"brand.secondary"} />
        </Button>
      </Flex>
    </Box>
  );
};

export default Card;
