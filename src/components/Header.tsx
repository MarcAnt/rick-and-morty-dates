import React from "react";
import { Box, Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as={"header"} display={"flex"} justifyContent={"flex-end"} my={5}>
      <Button variant={"outline"} color={"white"}>
        Logout
      </Button>
      <Button variant={"ghost"} color={"white"} paddingRight={10}>
        ES | EN
      </Button>
    </Box>
  );
};

export default Header;
