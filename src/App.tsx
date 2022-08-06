import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import Login from "./pages/Login";
import Main from "./pages/Main";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";
// import PublicRoute from "./router/PublicRoute";
// import PrivateRoute from "./router/PrivateRoute";
import SignUp from "./pages/SignUp";
import { useEffect } from "react";
import { supabase } from "./supabase";

const App = () => {
  const navigate = useNavigate();

  const session = supabase.auth.session();

  const user = supabase.auth.user();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);

      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <Box maxW={"1440px"} margin={"0 auto"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Routes>
          {/* <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            /> */}

          {/* <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
