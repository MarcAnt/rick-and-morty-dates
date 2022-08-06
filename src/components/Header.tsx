import { Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { fetchCharacters } from "../app/features/user/charactersSlice";
import { useAppSelector } from "../app/hooks";
import { useAppDispatch } from "../app/store";
import { supabase } from "../supabase";

const Header = () => {
  const navigate = useNavigate();

  // console.log(characters);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []);

  const logOut = () => {
    supabase.auth.signOut();
  };

  return (
    <Box as={"header"} display={"flex"} justifyContent={"flex-end"} my={5}>
      <Button variant={"outline"} color={"white"} onClick={logOut}>
        Logout
      </Button>
      <Button variant={"ghost"} color={"white"} paddingRight={10}>
        ES | EN
      </Button>
    </Box>
  );
};

export default Header;
