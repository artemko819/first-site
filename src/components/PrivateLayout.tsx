import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContextType, AuthContext } from "../context/authContext";
import { getAuthToken } from "../utils/cookie";

interface Props {
  children: JSX.Element;
}

const PrivateLayout = ({ children }: Props) => {
  const { isAuth, signIn, signOut } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const authToken = getAuthToken();  

  useEffect(() => {
    if (authToken) {
      signIn();
    } else {
      signOut()
    }
  }, [authToken]);

  useEffect(() => {
    if (!isAuth && !authToken) navigate("/");
  }, [isAuth]);

  if (!isAuth) {
    return null;
  }

  return children;
};

export default PrivateLayout;
