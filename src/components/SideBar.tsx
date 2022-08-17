import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Collapse,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagLabel,
  Text,
  useBoolean,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart, FaHeartBroken, FaSkull } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { RiAliensFill } from "react-icons/ri";
import { MdOutlineMyLocation } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearAllMatches,
  getMatches,
  removeMatch,
} from "../app/features/characters/charactersSlice";
import { Logo, RMToken } from "../assets/images";

import { addEllipses, gendersIcons } from "../utilities";
import { CharacterInfo } from "../models";
import { Footer } from "./Footer";
import ModalMatchInfo from "./modals/ModalMatchInfo";
import ModalTokenInfo from "./modals/ModalTokenInfo";

export const SideBar = ({
  onToggleMenu,
  isOpenMenu,
}: {
  onToggleMenu: () => void;
  isOpenMenu: boolean;
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    {} as CharacterInfo
  );
  const [coinCount, setCoinCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const dispatch = useAppDispatch();
  const matches = useAppSelector(getMatches);

  const matchSelected = (id: number) => {
    //Get the selected from the list and display on modal
    const filteredCharacter = matches.find((match) => match.id === id);
    if (filteredCharacter) setSelectedCharacter(filteredCharacter);
  };

  useEffect(() => {
    const countMatch = matches.filter((match) => {
      if (match.isMatch) {
        return match;
      }
      return;
    });

    if (countMatch.length >= 3 && coinCount === 0) {
      setCoinCount(1);
      onOpenModal();
    }
  }, [matches]);

  return (
    <>
      {isOpenMenu && (
        <Box
          as={motion.aside}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{
            transition: { delay: 0.5, duration: 0.5 },
          }}
          h={"100vh"}
          paddingX={10}
          borderRight={"1px solid"}
          borderRightColor={"brand.secondary"}
          position={{ xs: "absolute", sm: "absolute", md: "static" }}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          alignItems={"stretch"}
          bg={"brand.primary"}
          zIndex={{ xs: 1, sm: 1, md: 0 }}
          w={{ xs: "100%", sm: "100%", md: "auto" }}
          overflowY={"auto"}
          sx={{
            "::-webkit-scrollbar": {
              width: "10px",
            },

            "::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },

            "::-webkit-scrollbar-thumb": {
              background: "#888",
            },

            "::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          <HStack
            display={{ xs: "flex", sm: "flex", md: "none" }}
            justifyContent={"flex-end"}
            mt={2}
          >
            <CloseButton color={"white"} w={10} h={10} onClick={onToggleMenu} />
          </HStack>

          <Stack
            direction="column"
            borderBottom={"0.5px solid"}
            borderBottomColor={"brand.secondary"}
            w={"100%"}
          >
            <Image
              src={Logo}
              alt="Rick & Morty Logo green portal"
              my={5}
              width={"200px"}
              alignSelf={"center"}
            />
          </Stack>

          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"brand.secondary"}
            my={2}
            align={"center"}
          >
            Matches
          </Text>
          <Text
            fontSize={"sm"}
            fontWeight={"bold"}
            color={"brand.secondary"}
            align={"center"}
          >
            Match with 3 or 5 characters to win 1 (one) R&MCoin!
          </Text>
          <Stack spacing={5} w={"100%"} my={4}>
            <AnimatePresence>
              {matches.length ? (
                matches.map((match) => (
                  <HStack
                    key={match.name}
                    as={motion.div}
                    bgColor={
                      match.isMatch ? "#e53e3e75" : "brand.secondaryLight"
                    }
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
                    exit={{ opacity: 0, scale: 0 }}
                    layout
                    title={match.name}
                    alignItems={"center"}
                    cursor={"pointer"}
                    onClick={() => {
                      matchSelected(match.id);
                      onOpen();
                    }}
                  >
                    <Flex position={"relative"} py={2} px={1}>
                      <Avatar
                        size="md"
                        name={match.name}
                        boxShadow={"0px 0px 0 2.5px white"}
                        src={match.image}
                      />
                      <Icon
                        as={match.isMatch ? FaHeart : FaHeartBroken}
                        w={5}
                        h={5}
                        color={match.isMatch ? "red.400" : "red.500"}
                        position={"absolute"}
                        right={"-8px"}
                        bottom={0}
                      />
                    </Flex>
                    <Text
                      as={"span"}
                      color={"white"}
                      textOverflow={"ellipsis"}
                      pl={2}
                    >
                      {addEllipses(match.name)}
                    </Text>
                    <Button
                      variant={"ghost"}
                      position={"absolute"}
                      right={0}
                      className={"my-matches-close"}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeMatch(match.id));
                      }}
                    >
                      <Icon as={BiX} w={7} h={7} color={"white"} />
                    </Button>
                  </HStack>
                ))
              ) : (
                <Text
                  as={"span"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  color={"white"}
                  my={4}
                >
                  No matches yet. Prove your luck to match again.
                </Text>
              )}
            </AnimatePresence>
          </Stack>

          {matches.length ? (
            <Button
              width={"100%"}
              alignSelf={"center"}
              my={5}
              color={"brand.primary"}
              _active={{
                color: "brand.primary",
              }}
              onClick={() => {
                dispatch(clearAllMatches());
              }}
            >
              Clear all matches
            </Button>
          ) : null}
          <Footer />
        </Box>
      )}

      {/* Modals */}

      <ModalTokenInfo onClose={onCloseModal} isOpen={isOpenModal} />

      <ModalMatchInfo
        characterInfo={selectedCharacter}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};
