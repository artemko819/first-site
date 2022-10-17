import React, { createContext, useState } from 'react';
import { removeAuthToken } from '../utils/cookie';

export type AuthContextType = {
  isAuth: boolean,
  signIn: VoidFunction;
  signOut: VoidFunction;
};


export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [isAuth, setIsAuth] = useState(false);

  const signIn = () => {
    setIsAuth(true);
  };

  const signOut = () => {
    removeAuthToken();
    setIsAuth(false);
  };

  const value = {
    isAuth,
    signIn,
    signOut,
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
