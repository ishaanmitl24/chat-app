import React from "react";
import { useAppSelector } from "../store";
import { Navigate } from "react-router-dom";

const AuthRoute: React.FC<{ path: string; children: React.ReactNode }> = (
  props
) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { path, children } = props;

  return isAuthenticated ? <Navigate to="/" /> : <>{children}</>;
};

export default AuthRoute;
