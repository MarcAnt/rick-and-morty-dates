import { FC, useEffect, useState } from "react";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserDetails } from "../app/features/user/userActionsSlice";
import { logout } from "../app/features/user/userSlice";
import {
  clearAllMatches,
  getMatches,
} from "../app/features/characters/charactersSlice";
import { RMToken } from "../assets/images";

export const Header: FC = () => {
  const navigate = useNavigate();

  const { userInfo, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const matches = useAppSelector(getMatches);

  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    const countMatch = matches.filter((match) => {
      if (match.isMatch) {
        return match;
      }
      return;
    });
    if (countMatch.length > 2) setShowToken(true);
  }, [matches]);

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
        {showToken && (
          <Box
            bgColor={"brand.secondary"}
            rounded={"md"}
            p={1}
            display={{ xs: "none", sm: "block" }}
          >
            <Image
              borderRadius="full"
              boxSize="2rem"
              src={RMToken}
              alt="Rick & Morty Token"
            />
          </Box>
        )}

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
    </Box>
  );
};
