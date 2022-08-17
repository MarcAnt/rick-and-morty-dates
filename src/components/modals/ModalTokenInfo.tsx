import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { RMToken } from "../../assets/images";

const ModalTokenInfo = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent w={{ xs: "300px", sm: "400px" }} mx={2}>
        <ModalHeader textAlign={"center"} color={"brand.primary"}>
          You win!
        </ModalHeader>
        <ModalCloseButton color={"brand.primary"} />
        <ModalBody>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            my={2}
          >
            <Text
              color={"brand.primary"}
              my={2}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              You win a R&M Token after match with 3 characters
            </Text>
            <Image
              borderRadius="full"
              boxSize="7rem"
              src={RMToken}
              alt="Rick & Morty Token"
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalTokenInfo;
