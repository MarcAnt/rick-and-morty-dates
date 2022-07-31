import React from "react";
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Collapse,
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
import { FaHeart } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import Footer from "../components/Footer";

const Main = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onClose: onCloseMenu,
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onToggle,
  } = useDisclosure();
  const collapse = useBreakpointValue({ base: isOpenMenu, md: !isOpenMenu });

  const firstFieldRef = React.useRef(null);
  return (
    <Flex w="100%">
      <Collapse in={collapse} style={{ flex: 2, zIndex: 10 }}>
        <Box
          as={"aside"}
          h={"100vh"}
          paddingX={10}
          borderRight={"1px solid #EA580C"}
          // display={{ xs: "none", sm: "none", md: "flex" }}
          display={"flex"}
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
                Marcos Esqueda
              </Text>
            </HStack>
          </Stack>

          <Text
            as={"span"}
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"brand.secondary"}
            my={4}
          >
            Matches
          </Text>
          <Stack spacing={5} w={"100%"}>
            <HStack
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
            >
              <Box position={"relative"}>
                <Avatar
                  size="md"
                  name="Marcos Esqueda"
                  src="https://bit.ly/broken-link"
                />
                <Icon
                  as={FaHeart}
                  w={5}
                  h={5}
                  color={"brand.secondary"}
                  position={"absolute"}
                  right={"-8px"}
                  bottom={0}
                />
              </Box>
              <Text as={"span"} color={"white"}>
                Rick
              </Text>
              <Button
                variant={"ghost"}
                position={"absolute"}
                right={0}
                bottom={2.5}
                className={"my-matches-close"}
              >
                <Icon as={BiX} w={7} h={7} color={"white"} />
              </Button>
            </HStack>
            <HStack>
              <Avatar
                size="md"
                name="Marcos Esqueda"
                src="https://bit.ly/broken-link"
              />
              <Text as={"span"} color={"white"}>
                Morty
              </Text>
            </HStack>
            <HStack>
              <Avatar
                size="md"
                name="Marcos Esqueda"
                src="https://bit.ly/broken-link"
              />
              <Text as={"span"} color={"white"}>
                Rick Sanchez
              </Text>
            </HStack>
          </Stack>

          <Button width={"100%"} alignSelf={"center"} my={5}>
            Clear matches
          </Button>
          <Footer />
        </Box>
      </Collapse>

      {/* <Collapse in={collapse} style={{ flex: 2 }}></Collapse> */}

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
