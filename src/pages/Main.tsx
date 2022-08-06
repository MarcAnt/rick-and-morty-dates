import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Collapse,
  filter,
  Flex,
  HStack,
  Icon,
  Image,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Switch,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Logo } from "../assets/images";
import Header from "../components/Header";
import { AiFillControl, AiOutlineMenuUnfold } from "react-icons/ai";
import Card from "../components/Card";
import { FaGenderless, FaHeart, FaHeartBroken } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import Footer from "../components/Footer";
import { FiltersBoolean, Gender, Species } from "../models";
import {
  clearAllMatches,
  filterCharacter,
  getMatches,
  removeMatch,
} from "../app/features/user/charactersSlice";
import { useAppDispatch } from "../app/store";
import { useAppSelector } from "../app/hooks";
import { AnimatePresence, motion } from "framer-motion";

const Main = (): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onClose: onCloseMenu,
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onToggle,
  } = useDisclosure();

  const collapse = useBreakpointValue({
    base: isOpenMenu,
    md: !isOpenMenu,
  });

  const [filters, setFilters] = useState<FiltersBoolean>({
    species: { human: true, alien: true },
    gender: { female: true, male: true, genderless: false, unknown: false },
  });

  const firstFieldRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const matches = useAppSelector(getMatches);

  const createFilters = () => {
    // let f: string[] = [];

    let f: { genders: Gender[]; species: Species[] } = {
      genders: [],
      species: [],
    };

    if (filters.gender.female) {
      f = { species: [...f.species], genders: [...f.genders, "Female"] };
      // f = [...f, "female"];
    }

    if (filters.gender.male) {
      f = { species: [...f.species], genders: [...f.genders, "Male"] };
      // f = { ...f, male: "male" };
      // f = [...f, "male"];
    }

    if (filters.gender.genderless) {
      f = { species: [...f.species], genders: [...f.genders, "Genderless"] };
      // f = { ...f, genderless: "genderless" };
      // f = [...f, "genderless"];
    }

    if (filters.gender.unknown) {
      f = { species: [...f.species], genders: [...f.genders, "Unknown"] };
      // f = { ...f, unknown: "unknown" };
      // f = [...f, "unknown"];
    }

    if (filters.species.alien) {
      f = { genders: [...f.genders], species: [...f.species, "Alien"] };
      // f = { ...f, alien: "alien" };
      // f = [...f, "alien"];
    }
    if (filters.species.human) {
      f = { genders: [...f.genders], species: [...f.species, "Human"] };

      // f = { ...f, human: "human" };
      // f = [...f, "human"];
    }

    dispatch(filterCharacter(f));
  };

  const handleFilters = () => {
    createFilters();
  };

  useEffect(() => {
    createFilters();
  }, [filter]);

  const MotionStack = motion(HStack);

  //Control filters in modal. Almost one would be checked to Apply filter
  const isValidFilers =
    !filters.gender.female &&
    !filters.gender.male &&
    !filters.gender.genderless &&
    !filters.gender.unknown &&
    !filters.species.alien &&
    !filters.species.human;

  return (
    <Flex w="100%">
      <Collapse in={collapse} style={{ flex: 2, zIndex: 10 }}>
        <Box
          as={"aside"}
          h={"100vh"}
          paddingX={10}
          borderRight={"1px solid #EA580C"}
          // display={"flex"}
          position={{ xs: "absolute", sm: "absolute", md: "static" }}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          alignItems={"stretch"}
          bg={"brand.primary"}
          zIndex={{ xs: 1, sm: 1, md: 0 }}
          w={{ xs: "100%", sm: "100%", md: "auto" }}
        >
          <HStack
            display={{ xs: "flex", sm: "flex", md: "none" }}
            justifyContent={"flex-end"}
            mt={2}
          >
            <CloseButton color={"white"} onClick={onToggle} />
          </HStack>

          <Stack
            direction="column"
            borderBottom={"0.5px solid #EA580C"}
            w={"100%"}
          >
            <Image
              src={Logo}
              alt="Rick & Morty Logo green portal"
              my={5}
              width={"200px"}
              alignSelf={"center"}
            />

            <HStack pb={4}>
              <Avatar
                size="lg"
                name="Marcos Esqueda"
                src="https://bit.ly/broken-link"
              />
              <Text as={"span"} color={"white"}>
                {/* {name} */}
              </Text>
            </HStack>
          </Stack>

          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"brand.secondary"}
            my={2}
          >
            Matches
          </Text>
          <Stack spacing={5} w={"100%"} my={4}>
            <AnimatePresence>
              {matches.length ? (
                matches.map((match) => (
                  <MotionStack
                    key={match.name}
                    as={motion.div}
                    transition="0.5s linear"
                    bg="brand.secondaryLight"
                    borderRadius={10}
                    padding={1.5}
                    position={"relative"}
                    sx={{
                      ".my-matches-close": {
                        opacity: "0",
                      },
                      "&:hover .my-matches-close": {
                        opacity: "1",
                      },
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    title={match.name}
                  >
                    <Box position={"relative"}>
                      <Avatar size="md" name={match.name} src={match.image} />
                      <Icon
                        as={match.isMatch ? FaHeart : FaHeartBroken}
                        w={5}
                        h={5}
                        color={"brand.secondary"}
                        position={"absolute"}
                        right={"-8px"}
                        bottom={0}
                      />
                    </Box>
                    <Text
                      as={"span"}
                      color={"white"}
                      textOverflow={"ellipsis"}
                      pl={2}
                    >
                      {match.name}
                    </Text>
                    <Button
                      variant={"ghost"}
                      position={"absolute"}
                      right={0}
                      bottom={2.5}
                      className={"my-matches-close"}
                      onClick={() => {
                        dispatch(removeMatch(match.id));
                      }}
                    >
                      <Icon as={BiX} w={7} h={7} color={"white"} />
                    </Button>
                  </MotionStack>
                ))
              ) : (
                <Text
                  as={"span"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  color={"white"}
                  my={4}
                >
                  No matches yet. Prove your luck to macth.
                </Text>
              )}
            </AnimatePresence>
          </Stack>

          {matches.length && (
            <Button
              width={"100%"}
              alignSelf={"center"}
              my={5}
              onClick={() => {
                dispatch(clearAllMatches());
              }}
            >
              Clear all matches
            </Button>
          )}
          <Footer />
        </Box>
      </Collapse>

      <Box as={"main"} flex={6}>
        {/* Header */}
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Button variant={"ghost"} ml={5} onClick={onToggle}>
              <Icon
                as={AiOutlineMenuUnfold}
                w={7}
                h={7}
                color={"brand.secondary"}
              />
            </Button>

            <Popover
              isOpen={isOpen}
              initialFocusRef={firstFieldRef}
              onOpen={onOpen}
              onClose={onClose}
              closeOnBlur={false}
              placement="bottom-start"
            >
              <PopoverTrigger>
                <Button variant={"ghost"} ml={5}>
                  <Icon as={AiFillControl} w={7} h={7} color={"white"} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                bg="rgb(244 171 133)"
                color="white"
                borderColor={"brand.secondary"}
              >
                {/* <PopoverArrow /> */}
                <PopoverCloseButton color={"white"} />
                <PopoverBody my={3}>
                  <Text
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize="xl"
                    mb={3}
                  >
                    Species
                  </Text>
                  <Stack direction={"row"}>
                    <VStack>
                      <Box
                        as={"label"}
                        fontWeight={"bold"}
                        color={"brand.secondary"}
                        htmlFor={"human"}
                      >
                        Human
                      </Box>
                      <Switch
                        size="md"
                        alignSelf={"flex-start"}
                        id={"human"}
                        colorScheme="secondary"
                        isChecked={filters.species.human}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              species: {
                                ...filters.species,
                                human: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>
                    <VStack>
                      <Box
                        as={"label"}
                        fontWeight={"bold"}
                        color={"brand.secondary"}
                        htmlFor={"alien"}
                      >
                        Alien
                      </Box>
                      <Switch
                        size="md"
                        alignSelf={"flex-start"}
                        id={"alien"}
                        colorScheme="secondary"
                        isChecked={filters.species.alien}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              species: {
                                ...filters.species,
                                alien: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>
                  </Stack>

                  <Text
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize="xl"
                    my={3}
                  >
                    Gender
                  </Text>
                  <Stack direction={"row"}>
                    <VStack>
                      <Box
                        as={"label"}
                        fontWeight={"bold"}
                        color={"brand.secondary"}
                        htmlFor={"female"}
                      >
                        Female
                      </Box>
                      <Switch
                        size="md"
                        alignSelf={"flex-start"}
                        id={"female"}
                        colorScheme="secondary"
                        isChecked={filters.gender.female}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              gender: {
                                ...filters.gender,
                                female: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>
                    <VStack>
                      <Box
                        as={"label"}
                        fontWeight={"bold"}
                        color={"brand.secondary"}
                        htmlFor={"male"}
                      >
                        Male
                      </Box>
                      <Switch
                        size="md"
                        alignSelf={"flex-start"}
                        id={"male"}
                        colorScheme="secondary"
                        isChecked={filters.gender.male}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              gender: {
                                ...filters.gender,
                                male: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>
                    <VStack>
                      <Box
                        as={"label"}
                        fontWeight={"bold"}
                        color={"brand.secondary"}
                        htmlFor={"genderless"}
                      >
                        Genderless
                      </Box>
                      <Switch
                        alignSelf={"flex-start"}
                        size="md"
                        id={"genderless"}
                        colorScheme="secondary"
                        isChecked={filters.gender.genderless}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              gender: {
                                ...filters.gender,
                                genderless: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>
                    <VStack>
                      <Box
                        as={"label"}
                        fontWeight={"bold"}
                        color={"brand.secondary"}
                        htmlFor={"unknown"}
                      >
                        Unknown
                      </Box>
                      <Switch
                        alignSelf={"flex-start"}
                        size="md"
                        id={"unknown"}
                        colorScheme="secondary"
                        isChecked={filters.gender.unknown}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              gender: {
                                ...filters.gender,
                                unknown: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>
                  </Stack>

                  <HStack justifyContent={"flex-end"} mt={3}>
                    <Button
                      bg={"transparent"}
                      borderWidth={"0.5px"}
                      borderColor={"white"}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg={"white"}
                      color={"brand.secondary"}
                      _hover={{
                        color: "white",
                        bg: "brand.secondary",
                      }}
                      disabled={isValidFilers}
                      onClick={() => {
                        handleFilters();
                        onClose();
                      }}
                    >
                      Apply
                    </Button>
                  </HStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>

          <Header />
        </Flex>

        {/* Card */}
        <Card />
      </Box>
    </Flex>
  );
};

export default Main;
