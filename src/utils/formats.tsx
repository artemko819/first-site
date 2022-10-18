import { Currency } from "../types/pair";

export const formatOptions = (keys: readonly string[]) =>
  keys.map((key) => ({
    value: key,
    label: key.toUpperCase(),
  }));

export const getCurrencyName = (currency: Currency | null) =>
  !currency
    ? ""
    : currency.network
      ? `${currency.symbol} (${currency.network})`
      : currency.symbol;
