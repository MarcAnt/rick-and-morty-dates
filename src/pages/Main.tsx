import React, { FC, useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import {
  SideBar,
  Header,
  Card,
  FilterGenders,
  FilterSpecies,
} from "../components";

import { AiFillControl, AiOutlineMenuUnfold } from "react-icons/ai";

import { filterCharacter } from "../app/features/characters/charactersSlice";
import { useAppDispatch } from "../app/store";
import { useCycle } from "framer-motion";
import { createUrlParams } from "../utilities";
import { useBoolean } from "../hooks";

const Main: FC = () => {
  const {
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
    isOpen: isOpenFilter,
  } = useDisclosure();

  const { change, setChange } = useBoolean("change");

  const [open, cycleOpen] = useCycle(false, true);

  const firstFieldRef = useRef(null);
  const dispatch = useAppDispatch();

  const [genders, setGenders] = useState<string[]>(["Female"]);
  const [species, setSpecies] = useState<string[]>(["Human"]);

  const handleFiltersSpeciesParams = (
    value: string,
    setParamsFilters: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    let index = species.indexOf(value);
    if (index === -1) {
      setParamsFilters([value]);
      return;
    } else {
      setParamsFilters([]);
    }
  };

  const createFilters = () => {
    const genderParams = createUrlParams<string>(
      "gender",
      genders,
      "init",
      false
    );

    const speciesParam = createUrlParams<string>(
      "species",
      species,
      "init",
      false
    );

    dispatch(filterCharacter(`${genderParams}${speciesParam}`));
  };

  const handleFilters = () => {
    setChange(!change);
    createFilters();
  };

  useEffect(() => {
    //Set filter after first render
    handleFilters();
  }, []);

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
                <PopoverHeader color={"brand.primary"}>
                  Filter Characters
                </PopoverHeader>
                <PopoverBody>
                  <Text color={"brand.primary"} fontWeight={"extrabold"}>
                    Gender
                  </Text>
                  <FilterGenders
                    setParamsFilters={setGenders}
                    paramsFilters={genders}
                  />
                  {/* <RadioGroup defaultValue="Female">
                    <Stack
                      direction={["column", "row"]}
                      wrap={"wrap"}
                      spacing={0}
                      columnGap={2}
                      mt={2}
                    >
                      <Radio
                        value="Female"
                        onChange={(e) =>
                          handleFiltersGendersParams(e.target.value, setGenders)
                        }
                      >
                        <Text color={"brand.primary"}>Female</Text>
                      </Radio>
                      <Radio
                        value="Male"
                        onChange={(e) =>
                          handleFiltersGendersParams(e.target.value, setGenders)
                        }
                      >
                        <Text color={"brand.primary"}>Male</Text>
                      </Radio>
                      <Radio
                        value="Genderless"
                        onChange={(e) =>
                          handleFiltersGendersParams(e.target.value, setGenders)
                        }
                      >
                        <Text color={"brand.primary"}>Genderless</Text>
                      </Radio>
                      <Radio
                        value="Unknown"
                        onChange={(e) =>
                          handleFiltersGendersParams(e.target.value, setGenders)
                        }
                      >
                        <Text color={"brand.primary"}>Unknown</Text>
                      </Radio>
                    </Stack>
                  </RadioGroup> */}

                  <Text color={"brand.primary"} fontWeight={"extrabold"}>
                    Species
                  </Text>

                  <FilterSpecies
                    setParamsFilters={setSpecies}
                    paramsFilters={species}
                  />

                  {/* <RadioGroup defaultValue="Human">
                    <Stack
                      direction={["column", "row"]}
                      wrap={"wrap"}
                      spacing={0}
                      columnGap={2}
                      mt={2}
                    >
                      <Radio
                        value="Human"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Human</Text>
                      </Radio>
                      <Radio
                        value="Alien"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Alien</Text>
                      </Radio>
                      <Radio
                        value="Animal"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Animal</Text>
                      </Radio>
                      <Radio
                        value="Humanoid"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Humanoid</Text>
                      </Radio>
                      <Radio
                        value="Robot"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Robot</Text>
                      </Radio>
                      <Radio
                        value="Mythological"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Mythological</Text>
                      </Radio>
                      <Radio
                        value="Cronenberg"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Cronenberg</Text>
                      </Radio>
                      <Radio
                        value="Poopybutthole"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Poopybutthole</Text>
                      </Radio>
                      <Radio
                        value="unknown"
                        onChange={(e) =>
                          handleFiltersSpeciesParams(e.target.value, setSpecies)
                        }
                      >
                        <Text color={"brand.primary"}>Unknown</Text>
                      </Radio>
                    </Stack>
                  </RadioGroup> */}

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
        <Box
          h={"450px"}
          maxH={"450px"}
          maxW={"600px"}
          margin={{ xs: "1rem 2rem", sm: "1rem 2rem", md: "1rem auto" }}
        >
          <Card />
        </Box>
      </Box>
    </Flex>
  );
};

export default Main;
