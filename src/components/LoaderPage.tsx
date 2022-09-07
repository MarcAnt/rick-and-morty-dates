import { Box, Image, Stack } from "@chakra-ui/react";
import { HeartLogo } from "../assets/images";

const LoaderPage = () => {
  return (
    <Box w="full" h="full">
      <Stack
        w={"100%"}
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src={HeartLogo}
          alt="Rick & Morty Logo heart"
          my={5}
          width={"50"}
        />
      </Stack>
    </Box>
  );
};

export default LoaderPage;
