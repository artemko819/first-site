import React from "react";
import cn from "classnames";
import { Currency, CurrencyFrom } from "../types/pair";
import { useTranslation } from "react-i18next";
import { getCurrencyName } from "../utils/formats";
import { cryptoImage, cryptoImageFrom, selectImage } from "../apis/images";

interface Props {
  currenciesFrom: Currency[];
  currenciesTo: Currency[];
  setToItem: (currency: Currency) => void;
  setFromItem: (currency: CurrencyFrom) => void;
  fromItem: Currency;
  toItem: Currency;
}

const Pairs = ({
  currenciesFrom,
  currenciesTo,
  setToItem,
  setFromItem,
  fromItem,
  toItem,
}: Props) => {
  const { t } = useTranslation();
  const [openFrom, setOpenFrom] = React.useState(false);
  const [openTo, setOpenTo] = React.useState(false);
  const [selectIndex, setSelectIndex] = React.useState(0);
  const [selectIndexFrom, setSelectIndexFrom] = React.useState(0);

  const handleClickTo = (currency: Currency, i: any) => {
    setFromItem(currency as CurrencyFrom);
    setSelectIndex(i);
  };

  const handleClickFrom = (currency: Currency, i: any) => {
    setToItem(currency);
    setSelectIndexFrom(i);
  };
  return (
    <div className="grid grid-flow-col sm:auto-cols-[minmax(280px,_2fr)] lg:auto-cols-[minmax(734px,_2fr)] self-center items-center">
      <div className="wrap grid-cols-2 grid">
        <div className="w-full ">
     
          {/* <input
          placeholder="Найти валюту"
          className="mt-3 rounded-lg bg-secondary w-full p-3"
        /> */}
          <div>
            <div
              className={cn(
                "dropdown mr-5 border-solid border-2 border-accent",
                { open: openFrom }
              )}
            >
              <div
                className="caption lg:text-[21px] sm:text-[13px] font-semibold flex justify-between items-center"
                onClick={() => setOpenFrom(!openFrom)}
              >
                <span className="text-[21px] font-semibold inline-block">
                  {
                    <img
                      src={cryptoImage[selectIndex].src}
                      width="25"
                      alt={cryptoImage[selectIndex].src}
                    />
                  }
                </span>
                <span>{getCurrencyName(fromItem)}</span>
                <span>
                  <img src={selectImage} alt="select" />
                </span>
              </div>
              <div className="list" onClick={() => setOpenFrom(!setOpenFrom)}>
                {currenciesFrom.map((currency, i) => (
                  <button
                    type="button"
                    value={getCurrencyName(currency)}
                    key={currency.id}
                    disabled={currency.symbol === toItem.symbol}
                    onClick={() => handleClickTo(currency, i)}
                    className={cn(
                      "mb-3 flex items-center w-full hover:bg-accent hover:text-secondary transition disabled:opacity-50",
                      {
                        "bg-accent text-secondary":
                          fromItem?.id === currency.id,
                      }
                    )}
                  >
                    <span className="p-3 flex items-center font-semibold text-sm md:text-base">
                      <span className="pr-3">
                        {
                          <img
                            src={cryptoImage[i].src}
                            width="25"
                            alt={cryptoImage[i].src}
                          />
                        }
                      </span>
                      {getCurrencyName(currency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:ml-5 xl:ml-5 sm:ml-2 w-full pr-5">
          {/* <p className="font-bold text-2xl">{t("pairs.receive")}</p> */}
          {/* <input
          placeholder="Найти валюту"
          className="mt-3 rounded-lg bg-secondary w-full p-3"
        /> */}
          <div>
            <div
              className={cn(
                "dropdown border-solid border-2 border-accent mb-5",
                { open: openTo }
              )}
            >
              <div
                className="caption lg:text-[21px] sm:text-[13px] font-semibold justify-between flex items-center"
                onClick={() => setOpenTo(!openTo)}
              >
                <span className="lg:text-[21px] sm:text-[13px] font-semibold inline-block">
                  {
                    <img
                      src={cryptoImageFrom[selectIndexFrom].src}
                      width="25"
                      alt={cryptoImageFrom[selectIndexFrom].src}
                    />
                  }
                </span>
                {getCurrencyName(toItem)}
                <span>
                  <img src={selectImage} alt="select" />
                </span>
              </div>
              <div className="list" onClick={() => setOpenTo(!openTo)}>
                {currenciesTo.map((currency, i) => (
                  <button
                    type="button"
                    key={currency.id}
                    disabled={currency.symbol === fromItem.symbol}
                    onClick={() => handleClickFrom(currency, i)}
                    className={cn(
                      "mb-3 flex items-center w-full hover:bg-accent hover:text-secondary transition disabled:opacity-50",
                      {
                        "bg-accent text-secondary": toItem?.id === currency.id,
                      }
                    )}
                  >
                    <span className="p-3 flex items-center font-semibold text-sm md:text-base">
                      <span className="pr-3">
                        <img
                          src={cryptoImageFrom[i].src}
                          width="25"
                          alt={cryptoImageFrom[i].src}
                        />
                      </span>
                      {getCurrencyName(currency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pairs;
