import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { PropsChildren } from "../models";
// import { AuthContext } from "../auth/AuthContext";

const PrivateRoute = ({ children }: PropsChildren) => {
  //   const { user } = useContext(AuthContext);
  //   const { uid } = useSelector((state) => state.auth);

  const { pathname, search } = useLocation();
  //Ayuda a recordar la ultima ruta con todo y busqueda realizada
  //   localStorage.setItem("lastPath", pathname + search);

  return true ? <> {children} </> : <Navigate to="/login" />;
  //   return user.logged ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
