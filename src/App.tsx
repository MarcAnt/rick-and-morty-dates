import { Box, Button } from "@chakra-ui/react";
import "./App.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Box maxW={"1440px"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* <PageNotFound /> */}

        {/* <Login /> */}
        <Main />
      </Box>
    </Box>
  );
}

export default App;
