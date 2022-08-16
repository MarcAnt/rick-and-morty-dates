import { useEffect } from "react";

import { Avatar, AvatarBadge, Box, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserDetails } from "../app/features/user/userActionsSlice";
import { logout } from "../app/features/user/userSlice";
import { clearAllMatches } from "../app/features/characters/charactersSlice";

export const Header = () => {
  const navigate = useNavigate();

  const { userInfo, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getUserDetails(token));
    }
  }, [token, dispatch]);

  const logOut = () => {
    //Logout
    dispatch(logout());
    //Clear all matches
    dispatch(clearAllMatches());
  };

  return (
    <Box
      as={"header"}
      display={"flex"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      my={5}
      mr={5}
    >
      <HStack mr={5}>
        <Avatar
          size="md"
          name={`${userInfo.name ? userInfo.name : ""}`}
          title={`${userInfo.name ? userInfo.name : ""}`}
        >
          <AvatarBadge
            borderColor="brand.primary"
            boxSize="1em"
            bg="green.500"
          />
        </Avatar>
      </HStack>

      <Button
        variant={"outline"}
        color={"white"}
        fontWeight={"normal"}
        onClick={logOut}
      >
        Logout
      </Button>
      {/* <Button variant={"ghost"} color={"white"} paddingRight={10}>
        ES | EN
      </Button> */}
    </Box>
  );
};
