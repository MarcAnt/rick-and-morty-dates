import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./router/PrivateRoute";
import LoaderPage from "./components/LoaderPage";

const Main = lazy(() => import("./pages/Main"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

const App = () => {
  return (
    <Box maxW={"1440px"} margin={"0 auto"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Suspense fallback={<LoaderPage />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Main />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
};

export default App;
