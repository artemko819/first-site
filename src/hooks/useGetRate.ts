
import { useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";

import { Currency } from "../types/pair";
import { getCurrencyName } from "../utils/formats";

const BASE_URL = "wss://stream.binance.com:9443/ws";

interface Props {
  fromItem: Currency | null,
  toItem: Currency | null,
  percent: number,
}

export const useGetRate = ({ fromItem, toItem, percent }: Props) => {
  const [rate, setRate] = useState("");
  const [renderRate, setRenderRate] = useState("");
  const [socketUrlFrom, setSocketUrlFrom] = useState("");
  const [socketUrlTo, setSocketUrlTo] = useState("");
  const { lastJsonMessage: lastMessageFrom } =
    useWebSocket<{ p: string } | null>(socketUrlFrom, {}, !!socketUrlFrom);
  const { lastJsonMessage: lastMessageTo } =
    useWebSocket<{ p: string } | null>(socketUrlTo, {}, !!socketUrlFrom);

  useEffect(() => {
    const toPrice = Number(lastMessageTo ? lastMessageTo.p : toItem?.price);
    const fromPrice = Number(lastMessageFrom ? lastMessageFrom.p : fromItem?.price);
    const localRate = fromPrice / toPrice;
    const rateWithPercent = (percent
      ? localRate * (1 + percent / 100)
      : localRate).toFixed(5);

    if (fromPrice > toPrice) {
      setRenderRate(`1 ${getCurrencyName(fromItem)} = ${rateWithPercent} ${getCurrencyName(toItem)}`)
    } else {
      setRenderRate(`${rateWithPercent} ${getCurrencyName(fromItem)} = 1 ${getCurrencyName(toItem)}`)
    }

    setRate(rateWithPercent);
  }, [lastMessageFrom, lastMessageTo, fromItem, toItem]);

  useEffect(() => {

  }, [rate])

  const amount = useMemo(
    () => Number(lastMessageFrom ? lastMessageFrom.p : fromItem?.price),
    [lastMessageFrom, fromItem]
  )

  useEffect(() => {
    if (fromItem && toItem) {
      handleOpenSocket(fromItem, toItem);
    }
  }, [fromItem, toItem]);

  const handleOpenSocket = (from: Currency, to: Currency) => {
    setSocketUrlFrom(`${BASE_URL}/${from.symbol.toLowerCase()}usdt@trade`);
    setSocketUrlTo(`${BASE_URL}/${to.symbol.toLowerCase()}usdt@trade`);
  };

  return { rate, amount, renderRate }
}
