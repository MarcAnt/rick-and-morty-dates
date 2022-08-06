import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PropsChildren } from "../models";
// import { AuthContext } from "../auth/AuthContext";

const PublicRoute = ({ children }: PropsChildren) => {
  //   const { uid } = useSelector((state) => state.auth);

  //   const { user } = useContext(AuthContext);
  return true ? <Navigate to="/" /> : <> {children} </>;
  //   return !user.logged ? children : <Navigate to="/" />;
};

export default PublicRoute;
