import { Alert, AlertIcon, AlertTitle, Heading } from "@chakra-ui/react";

import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = () => {
  const { userInfo } = useAppSelector((state) => state.user);

  if (!userInfo) {
    return (
      <Alert status="error" mt={2} rounded={"lg"}>
        <AlertIcon />
        <AlertTitle color={"red.800"}>
          <Heading as={"h1"}>Unauthorized :(</Heading>
          <NavLink to="/login">Login</NavLink> to gain access
        </AlertTitle>
      </Alert>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
