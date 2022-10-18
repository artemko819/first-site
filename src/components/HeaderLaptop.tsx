import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Icon from "./Icon";
import { Option } from "../types/global";
import Select from "react-select";

interface Props {
  links: {
    name: string;
    href: string;
  }[];
  options: Option[];
  isAuth: boolean;
}

const HeaderLaptop = ({ links, options, isAuth }: Props) => {
  const { i18n, t } = useTranslation();
  return (
    <header className="container mx-auto px-4 my-10">
      <div className="flex w-full">
        <div className="flex w-full items-center">
          <Link to="/" className="h-14">
            <img className="h-full object-contain" src={logo} alt="logo" />
          </Link>
          <nav className="flex items-center mx-auto lg:gap-20 sm:gap-8">
            {links.map(({ name, href }) => (
              <Link
                key={name}
                className="ml-3 lg:text-[23px] md:text-[16px] sm:text-[14px] text-center text-white transition"
                to={href}
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="">
          <Link
            to="/login"
            className="flex ml-2 items-center pt-[5px] pb-[5px] pl-[45px] pr-[45px] text-[23px] bg-accent transition  "
          >
            {/* <Icon name="arrow_forward" className="mr-2" /> */}
            {t(isAuth ? "personalCabinet" : "signIn")}
          </Link>
        </div>
        </div>
   
      </div>
    </header>
  );
};

export default HeaderLaptop;
