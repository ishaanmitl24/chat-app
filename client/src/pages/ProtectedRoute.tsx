import React, { useEffect } from "react";
import { useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ path: string; children: React.ReactNode }> = (
  props
) => {
  const { path, children } = props;
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : <></>;
};

export default ProtectedRoute;
