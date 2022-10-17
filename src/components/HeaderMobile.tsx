import React, { useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { formatOptions } from "../utils/formats";
import Icon from "./Icon";
import Select from "react-select";
import ColorStain from "./ui/ColorStain";
import { Option } from "../types/global";

interface Props {
  links: {
    name: string;
    href: string;
  }[],
  options: Option[],
  isAuth: boolean,
}

const HeaderMobile = ({ links, options, isAuth }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const handleOpen = () => {
    if (isOpen) {
      document.querySelector('[id="root"]')?.setAttribute("class", "");
    } else {
      document
        .querySelector('[id="root"]')
        ?.setAttribute("class", "overflow-hidden	h-screen");
    }
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="container mx-auto my-5 overflow-hidden">
      <div className="relative grid grid-cols-12 z-50">
        <Link to="/" className="h-14 col-span-4">
          <img className="h-full w-full object-contain" src={logo} alt="logo" />
        </Link>
        <div className="flex items-center col-span-8 justify-end">
          <Link
            to="/login"
            className="flex items-center p-2 rounded-lg bg-accent transition text-sm"
          >
            <Icon name="arrow_forward" className="mr-2" />
            {t(isAuth ? 'personalCabinet' : "signIn")}
          </Link>

          <button type="button" onClick={handleOpen} className="p-3">
            {isOpen ? <Icon name="close" /> : <Icon name="menu" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute bg-black w-full h-full z-40 text-center left-0 p-5">
          {/* <Select
            className="text-black w-[100px] m-auto"
            options={options}
            value={options.find(
              (option) => option.value === i18n.resolvedLanguage
            )}
            onChange={(option) => i18n.changeLanguage(option?.value)}
          /> */}
          <nav className="flex flex-col">
            {links.map(({ name, href }) => (
              <Link
                key={name}
                className="mt-3 ml-3 text-lg text-secondaryText transition"
                to={href}
                onClick={handleOpen}
              >
                {name}
              </Link>
            ))}
          </nav>
          <ColorStain size={100} color="orange" />
          <div className=" u-top-20">
            <ColorStain size={100} color="blue" className="u-right-15" />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderMobile;
