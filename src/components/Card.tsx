import { useEffect, useState, FC, Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  SkeletonCircle,
  Text,
  useToast,
} from "@chakra-ui/react";
import { RiAliensFill } from "react-icons/ri";
import { FaHeart, FaSkull } from "react-icons/fa";
import { BiX } from "react-icons/bi";

import {
  fetchCharacters,
  getMatches,
  selectStatus,
  setMatches,
  getInfo,
  getFilters,
  getAllCharacters,
} from "../app/features/characters/charactersSlice";
import { useAppSelector } from "../app/hooks";
import { useAppDispatch } from "../app/store";
import { CharacterInfo } from "../models";
import { NoImage } from "../assets/images";
import { gendersIcons, randomNum } from "../utilities";
import { useFetchCharacter } from "../hooks";

export const Card: FC = () => {
  // const [randomNumber, setRandomNumber] = useState(0);
  const [countPage, setCountPage] = useState(1);
  const [character, setCharacter] = useState<CharacterInfo>();
  const [isNextMatch, setIsNextMatch] = useState(false);

  const toast = useToast();

  const dispatch = useAppDispatch();
  // const characters = useAppSelector(getAllCharacters);
  const matches = useAppSelector(getMatches);
  const status = useAppSelector(selectStatus);
  const info = useAppSelector(getInfo);
  const filters = useAppSelector(getFilters);

  //reset count page after change filters
  // useEffect(() => {
  //   dispatch(fetchCharacters({ page: randomNumber, params: filters }));
  // }, [randomNumber]);

  const characters = useFetchCharacter({ page: countPage, params: filters });

  //Get the filtered and current character
  useEffect(() => {
    const randomCharacter = randomNum(characters.length);
    setCharacter(characters[randomCharacter]);
  }, [characters]);

  //changing filters at Main
  useEffect(() => {
    setCountPage(1);
    // setRandomNumber(0);
    // dispatch(fetchCharacters({ page: 1, params: filters }));
    // useFetchCharacter({ page: 1, params: filters });
  }, [filters]);

  const noMatches = async () => {
    if (info.pages === countPage) setCountPage(1);
    else setCountPage((prev) => prev + 1);

    // setRandomNumber(countPage);
  };

  const handleMatches = async () => {
    try {
      //Set a random match for liked character
      const lastMatches: string = localStorage.getItem("latestMatch") || "[]";
      const lastMatch = JSON.parse(lastMatches);

      const matched = randomNum(character ? character?.id : 10) % 2 === 0;
      const characterMatches = { ...character, isMatch: matched };

      if (Array.isArray(lastMatch) && lastMatch[0]?.id === character?.id) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            //send another random number to fetch another character
            noMatches();

            resolve(setIsNextMatch(false));
          }, 2000);
        });

        toast({
          position: "bottom-right",
          isClosable: true,
          render: () => (
            <Flex
              rounded={"lg"}
              p={3}
              bgColor={"brand.secondary"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Text color="brand.primary" fontWeight={"bold"}>
                Character already exist. Try again.
              </Text>
            </Flex>
          ),
        });

        return;
      }

      dispatch(setMatches(characterMatches));
      setIsNextMatch(true);

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          //send another random number to fetch another character
          noMatches();

          resolve(setIsNextMatch(false));
        }, 2000);
      });

      toast({
        position: "bottom-right",
        isClosable: true,
        render: () => (
          <Flex
            rounded={"lg"}
            p={3}
            bgColor={"brand.secondary"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Icon as={FaHeart} w={8} h={8} color={"red.600"} />
            <Text color="brand.primary" fontWeight={"bold"}>
              A New character to Match!
              <br />
              Check the left panel to see all.
            </Text>
          </Flex>
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isMaxLengthMatch: boolean =
    isNextMatch ||
    matches.length >= 5 ||
    status === "loading" ||
    !character?.name;

  return (
    <Box
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
        bgColor={"white"}
        borderTopLeftRadius={15}
        borderBottomLeftRadius={{ xs: 0, sm: 0, md: 15 }}
        borderTopRightRadius={{ xs: 15, sm: 15, md: 0 }}
      >
        <SkeletonCircle
          boxSize="200px"
          isLoaded={status !== "loading" ? true : false}
        >
          <Image
            borderRadius="full"
            boxSize="200px"
            src={character?.image}
            alt={character?.name ? character.name : "No image"}
            fallbackSrc={NoImage}
          />
        </SkeletonCircle>

        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          borderRadius="full"
          borderWidth={5}
          borderColor={"brand.primary"}
          bg={"brand.secondary"}
          w={"60px"}
          h={"60px"}
          bottom={{ xs: "10px", sm: "10px", md: "130px" }}
          transform="translateX(80px)"
        >
          {character?.gender ? (
            <Icon
              as={gendersIcons[character.gender]}
              w={7}
              h={7}
              color={"brand.primary"}
            />
          ) : null}
        </Flex>
      </Flex>
      <Flex
        bg={"brand.greenCard"}
        direction={"column"}
        alignItems={{ xs: "center", sm: "center", md: "stretch" }}
        justifyContent={"center"}
        flex={1}
        paddingLeft={{ md: 5 }}
        borderBottomRightRadius={15}
        borderTopRightRadius={{ xs: 0, sm: 0, md: 15 }}
        borderBottomLeftRadius={{ xs: 15, sm: 15, md: 0 }}
        rowGap={"1rem"}
      >
        <Text
          as={"h3"}
          fontSize={{ xs: "1.5rem", sm: "2rem", md: "2rem" }}
          color={"brand.primary"}
          fontWeight={"bold"}
          textAlign={{ xs: "center", sm: "center", md: "initial" }}
        >
          {character?.name ? (
            character.name
          ) : (
            <Text fontSize="lg">
              There's not characters. Try again or apply other filters.
            </Text>
          )}
        </Text>

        <HStack>
          <HStack>
            {character?.species ? (
              <Icon as={RiAliensFill} w={7} h={7} color={"brand.primary"} />
            ) : (
              "No data, try again!"
            )}
            <Text as={"span"} color={"white"} fontWeight={"bold"}>
              {character?.species ? character.species : ""}
            </Text>
          </HStack>
          <HStack>
            {character?.status ? (
              <Icon as={FaSkull} w={5} h={5} color={"brand.primary"} ml={1} />
            ) : null}
            <Text as={"span"} color={"white"} fontWeight={"bold"}>
              {character?.status ? character.status : ""}
            </Text>
          </HStack>
        </HStack>
      </Flex>

      <Flex
        position={"absolute"}
        direction={{ xs: "row", sm: "row", md: "column" }}
        justifyContent={"center"}
        alignItems={"center"}
        bottom={-8}
        left={{ xs: "calc(50% - 33px)", sm: "calc(50% - 33px)" }}
        gap={3}
      >
        <Box
          borderRadius="full"
          borderWidth={3}
          borderColor={"brand.secondary"}
          bg={"gray.800"}
          w={"45px"}
          h={"45px"}
          transform={"translateX(-20%)"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={noMatches}
        >
          <Icon as={BiX} w={7} h={7} color={"white"} />
        </Box>
        <Button
          borderRadius="full"
          borderWidth={5}
          borderColor={"red.500"}
          bg={"white"}
          w={"65px"}
          h={"65px"}
          transform={"translateX(-10%)"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          variant={"ghost"}
          onClick={handleMatches}
          isDisabled={isMaxLengthMatch}
          _hover={{
            bg: "white",
          }}
          _active={{
            bg: "white",
          }}
          _disabled={{
            filter: "grayscale(50%)",
            cursor: "not-allowed",
          }}
        >
          <Icon as={FaHeart} w={8} h={8} color={"red.600"} />
        </Button>
      </Flex>
    </Box>
  );
};
