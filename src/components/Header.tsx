import React from "react";
import { useTranslation } from "react-i18next";
import { useWindowContext } from "../context/sizeContetx";
import HeaderLaptop from "./HeaderLaptop";
import HeaderMobile from "./HeaderMobile";
import i18next from "i18next";
import { formatOptions } from "../utils/formats";
import { getAuthToken } from "../utils/cookie";

const Header = () => {
  const { t } = useTranslation();
  const { atLeastMd } = useWindowContext();
  const options = formatOptions(i18next.languages);
  const authToken = getAuthToken();  

  const links = [
    {
      name: t("headerLinks.rules"),
      href: "/rules",
    },
    {
      name: t("headerLinks.faq"),
      href: "/faq",
    },
    {
      name: t("headerLinks.contacts"),
      href: "/contacts",
    },
  ];

  if (atLeastMd) {
    return <HeaderLaptop options={options} links={links} isAuth={!!authToken} />;
  } else {
    return <HeaderMobile options={options} links={links} isAuth={!!authToken} />;
  }
};

export default Header;
