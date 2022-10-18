import { useMemo } from "react";
import { Currency, Pair } from "../types/pair";

interface Props {
  pairs: Pair[],
  isLoading: boolean,
}

export const useGetUniquePairs = ({ isLoading, pairs }: Props) => {
  const getUniqueCurrencies = (currencies: Currency[]) => {
    const result: Currency[] = [];

    for (const currency of currencies) {
      if (result.length && result.find((item) => item.id === currency.id)) {
        continue;
      } else {
        result.push(currency);
      }
    }
    return result;
  };

  const uniqueCurrenciesFrom = useMemo(() => {
    const currenciesFrom = pairs.map((item) => ({
      ...item.from,
      max: item.max,
      min: item.min,
    }));
    return getUniqueCurrencies(currenciesFrom);
  }, [isLoading]);


  const uniqueCurrenciesTo = useMemo(() => {
    const currenciesFrom = pairs.map((item) => item.to);
    return getUniqueCurrencies(currenciesFrom);
  }, [isLoading]);

  return { uniqueCurrenciesFrom, uniqueCurrenciesTo }
}
