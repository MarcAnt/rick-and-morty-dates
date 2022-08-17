import {
  Button,
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
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaHeart, FaHeartBroken, FaSkull } from "react-icons/fa";
import { RiAliensFill } from "react-icons/ri";
import { MdOutlineMyLocation } from "react-icons/md";
import { CharacterInfo } from "../../models";
import { gendersIcons } from "../../utilities";

const ModalMatchInfo = ({
  characterInfo,
  onClose,
  isOpen,
}: {
  characterInfo: CharacterInfo;
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent mx={3}>
        <ModalHeader color={"brand.primary"}>
          <ModalCloseButton color={"brand.primary"} />
          <Flex
            mt={5}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"0.5rem"}
          >
            <Text color={"red.800"} fontSize={"2xl"}>
              {characterInfo.isMatch ? "Is a Match" : "Not match"}
            </Text>
            <Icon
              as={characterInfo.isMatch ? FaHeart : FaHeartBroken}
              w={6}
              h={6}
              color={"red.500"}
            />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex
            position={"relative"}
            py={2}
            px={1}
            justifyContent={"space-evenly"}
          >
            <HStack justifyContent={"center"} alignItems={"center"} flex={1}>
              <Image
                borderRadius="full"
                boxSize="8rem"
                src={characterInfo?.image && characterInfo.image}
                alt={characterInfo?.name && characterInfo.name}
              />
            </HStack>

            <VStack flex={2}>
              <Heading
                fontSize={"xl"}
                fontWeight={"bold"}
                color={"brand.primary"}
              >
                {characterInfo.name}
              </Heading>
              <HStack
                spacing={3}
                wrap={"wrap"}
                rowGap={2}
                justifyContent={"center"}
              >
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  bg="brand.primary"
                >
                  <TagLabel mr={2}>{characterInfo.species}</TagLabel>
                  <Icon as={RiAliensFill} />
                </Tag>
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  bg="brand.primary"
                >
                  <TagLabel mr={2}>{characterInfo.gender}</TagLabel>
                  <Icon as={gendersIcons[characterInfo.gender]} />
                </Tag>
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  bg="brand.primary"
                >
                  <TagLabel mr={2}>{characterInfo?.location?.name}</TagLabel>
                  <Icon as={MdOutlineMyLocation} />
                </Tag>
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  bg="brand.primary"
                >
                  <TagLabel mr={2}>{characterInfo.status}</TagLabel>
                  <Icon as={FaSkull} />
                </Tag>
              </HStack>
            </VStack>
          </Flex>
        </ModalBody>
        <ModalFooter>
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
            // disabled={isValidFilters}
            onClick={() => {
              // handleFilters();
              // onCloseFilter();
              onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalMatchInfo;
