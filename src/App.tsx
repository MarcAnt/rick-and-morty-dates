import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Login from "./pages/Login";
import Main from "./pages/Main";
import PageNotFound from "./pages/PageNotFound";

// import PublicRoute from "./router/PublicRoute";
// import PrivateRoute from "./router/PrivateRoute";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./router/PrivateRoute";

const App = () => {
  return (
    <Box maxW={"1440px"} margin={"0 auto"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Main />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
