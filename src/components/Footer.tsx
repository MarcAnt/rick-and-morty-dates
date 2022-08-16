import { Box, Text, Link, HStack } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

export const Footer = () => {
  return (
    <HStack as="footer" my={5}>
      <Text as={"i"} color={"white"} fontWeight={"bold"}>
        develope
      </Text>

      <a
        target="_blank"
        href={"https://www.linkedin.com/in/marcos-esqueda/"}
        style={{ fontWeight: "bold", color: "white" }}
      >
        @bymarcant
      </a>
    </HStack>
  );
};
