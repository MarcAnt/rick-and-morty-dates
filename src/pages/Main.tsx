import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  filter,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { SideBar, Header, Card } from "../components";

import { AiFillControl, AiOutlineMenuUnfold } from "react-icons/ai";

import { FiltersBoolean, Gender, Species } from "../models";
import { filterCharacter } from "../app/features/characters/charactersSlice";
import { useAppDispatch } from "../app/store";
import { useCycle } from "framer-motion";

const Main = (): JSX.Element => {
  const [filters, setFilters] = useState<FiltersBoolean>({
    species: {
      human: true,
      alien: true,
      mythological: true,
      humanoid: true,
      other: true,
    },
    gender: { female: true, male: true, genderless: false, unknown: false },
  });

  const {
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
    isOpen: isOpenFilter,
  } = useDisclosure();

  const [open, cycleOpen] = useCycle(false, true);

  const firstFieldRef = React.useRef(null);
  const dispatch = useAppDispatch();

  const createFilters = () => {
    let f: { genders: Gender[]; species: Species[] } = {
      genders: [],
      species: [],
    };

    //Genders

    if (filters.gender.female) {
      f = { species: [...f.species], genders: [...f.genders, "Female"] };
    }

    if (filters.gender.male) {
      f = { species: [...f.species], genders: [...f.genders, "Male"] };
    }

    if (filters.gender.genderless) {
      f = { species: [...f.species], genders: [...f.genders, "Genderless"] };
    }

    if (filters.gender.unknown) {
      f = { species: [...f.species], genders: [...f.genders, "Unknown"] };
    }

    //Espcies

    if (filters.species.alien) {
      f = { genders: [...f.genders], species: [...f.species, "Alien"] };
    }
    if (filters.species.human) {
      f = { genders: [...f.genders], species: [...f.species, "Human"] };
    }

    if (filters.species.humanoid) {
      f = { genders: [...f.genders], species: [...f.species, "Humanoid"] };
    }

    if (filters.species.mythological) {
      f = {
        genders: [...f.genders],
        species: [...f.species, "Mythological Creature"],
      };
    }

    if (filters.species.other) {
      f = { genders: [...f.genders], species: [...f.species, "Others"] };
    }

    dispatch(filterCharacter(f));
  };

  const handleFilters = () => {
    createFilters();
  };

  useEffect(() => {
    createFilters();
  }, [filter]);

  //Control filters in popover. Almost one would be checked to Apply filters
  const isValidFilters =
    !filters.gender.female &&
    !filters.gender.male &&
    !filters.gender.genderless &&
    !filters.gender.unknown &&
    !filters.species.alien &&
    !filters.species.humanoid &&
    !filters.species.mythological &&
    !filters.species.other &&
    !filters.species.human;

  return (
    <Flex w="100%">
      <SideBar onToggleMenu={cycleOpen} isOpenMenu={open} />

      <Box as={"main"} flex={6}>
        {/* Header */}
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex>
            <Button variant={"ghost"} ml={5} onClick={() => cycleOpen()}>
              <Icon
                as={AiOutlineMenuUnfold}
                w={7}
                h={7}
                color={"brand.secondary"}
                title={"Matches panel"}
              />
            </Button>

            <Popover
              isOpen={isOpenFilter}
              initialFocusRef={firstFieldRef}
              onOpen={onOpenFilter}
              onClose={onCloseFilter}
              closeOnBlur={false}
              placement="bottom-start"
            >
              <PopoverTrigger>
                <Button variant={"ghost"}>
                  <Icon
                    as={AiFillControl}
                    w={7}
                    h={7}
                    color={"white"}
                    title={"Filters"}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                bg="white"
                color="white"
                borderColor={"brand.primary"}
                borderWidth={2}
              >
                <PopoverCloseButton color={"brand.primary"} />
                <PopoverBody>
                  <Text
                    color={"brand.primary"}
                    fontWeight={"extrabold"}
                    fontSize="xl"
                    mb={3}
                  >
                    Species
                  </Text>
                  <Stack direction={"row"} wrap={"wrap"}>
                    <VStack>
                      <Box
                        as={"label"}
                        color={"brand.primary"}
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
                        color={"brand.primary"}
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

                    <VStack>
                      <Box
                        as={"label"}
                        color={"brand.primary"}
                        htmlFor={"humanoid"}
                      >
                        Humanoid
                      </Box>
                      <Switch
                        size="md"
                        alignSelf={"flex-start"}
                        id={"humanoid"}
                        colorScheme="secondary"
                        isChecked={filters.species.humanoid}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              species: {
                                ...filters.species,
                                humanoid: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>

                    <VStack>
                      <Box
                        as={"label"}
                        color={"brand.primary"}
                        htmlFor={"myth"}
                      >
                        Mythological
                      </Box>
                      <Switch
                        size="md"
                        alignSelf={"flex-start"}
                        id={"myth"}
                        colorScheme="secondary"
                        isChecked={filters.species.mythological}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              species: {
                                ...filters.species,
                                mythological: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>
                    <VStack style={{ margin: 0 }}>
                      <Box
                        as={"label"}
                        color={"brand.primary"}
                        htmlFor={"others"}
                      >
                        Others
                      </Box>
                      <Switch
                        size="md"
                        alignSelf={"flex-start"}
                        id={"others"}
                        colorScheme="secondary"
                        isChecked={filters.species.other}
                        onChange={(e) => {
                          setFilters(
                            Object.assign({}, filters, {
                              species: {
                                ...filters.species,
                                other: e.target.checked,
                              },
                            })
                          );
                        }}
                      />
                    </VStack>
                  </Stack>

                  <Text
                    color={"brand.primary"}
                    fontWeight={"extrabold"}
                    fontSize="xl"
                    my={3}
                  >
                    Gender
                  </Text>
                  <Stack direction={"row"} wrap={"wrap"}>
                    <VStack>
                      <Box
                        as={"label"}
                        color={"brand.primary"}
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
                        color={"brand.primary"}
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
                        color={"brand.primary"}
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
                        color={"brand.primary"}
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
                      color={"brand.primary"}
                      onClick={onCloseFilter}
                      variant={"outline"}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={"solid"}
                      bg={"brand.primary"}
                      _hover={{
                        bg: "brand.primary",
                        color: "brand.secondary",
                      }}
                      _active={{
                        bg: "brand.primary",
                        color: "brand.secondary",
                      }}
                      color={"brand.secondary"}
                      disabled={isValidFilters}
                      onClick={() => {
                        handleFilters();
                        onCloseFilter();
                      }}
                    >
                      Apply
                    </Button>
                  </HStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>

          <Header />
        </Flex>

        {/* Card */}
        <Card />
      </Box>
    </Flex>
  );
};

export default Main;
