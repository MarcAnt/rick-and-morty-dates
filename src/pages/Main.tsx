import { FC, useEffect, useState, useRef } from "react";
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

  const createFilters = () => {
    const genderParams = createUrlParams("gender", genders, "init");

    const speciesParam = createUrlParams("species", species, "init");

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

                  <Text color={"brand.primary"} fontWeight={"extrabold"}>
                    Species
                  </Text>

                  <FilterSpecies
                    setParamsFilters={setSpecies}
                    paramsFilters={species}
                  />

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
