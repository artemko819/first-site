import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

export type WindowInfo = {
  atLeastLg: boolean;
  atLeastMd: boolean;
  height: number;
}

const getWindowInfo = (): WindowInfo => ({
  atLeastLg: window.innerWidth >= 1024,
  atLeastMd: window.innerWidth >= 768,
  height: window.innerHeight,
});

const WindowContext = createContext<WindowInfo>(getWindowInfo());

interface Props {
  children?: ReactNode;
}

export const WindowContextProvider = ({ children }: Props): JSX.Element => {
  const [windowInfo, setWindowInfo] = useState<WindowInfo>(getWindowInfo());

  useEffect(() => {
    const handleResize = () => void setWindowInfo(getWindowInfo());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowInfo]);

  return <WindowContext.Provider value={windowInfo}>{children}</WindowContext.Provider>;
}

export const useWindowContext = () => useContext(WindowContext);
