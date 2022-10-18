import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Currency, CurrencyFrom, Pair } from "../types/pair";
import { useGetUniquePairs } from "./useGetUniquePairs";

interface Props {
  pairs: Pair[],
  isLoading: boolean,
}

export const useGetSelectedPair = ({ pairs, isLoading }: Props) => {
  const [searchParams] = useSearchParams();
  const { uniqueCurrenciesFrom, uniqueCurrenciesTo } = useGetUniquePairs({ isLoading, pairs })

  const [fromItem, setFromItem] = useState<CurrencyFrom | null>(null);
  const [toItem, setToItem] = useState<Currency | null>(null);

  const selectedPair = useMemo(
    () => pairs.find((item) => !!item.isSelected),
    [isLoading]
  );

  useEffect(() => {
    const pairFromUrl = searchParams.get("pair");
    let selectedFromItem: Currency | null = null;
    let selectedToItem: Currency | null = null;

    if (pairFromUrl) {
      const [fromName, toName] = pairFromUrl.split('-');
      const localSelectedFrom = uniqueCurrenciesFrom.find(
        (item) => item.name === fromName
      );
      const localSelectedTo = uniqueCurrenciesTo.find(
        (item) => item.name === toName
      );
      if (localSelectedTo && localSelectedFrom) {
        selectedFromItem = localSelectedFrom;
        selectedToItem = localSelectedTo;
      }
    } else if (selectedPair) {
      selectedFromItem = selectedPair.from;
      selectedToItem = selectedPair.to;
    } else {
      selectedFromItem = uniqueCurrenciesFrom[0];
      selectedToItem = uniqueCurrenciesTo[0];
    }

    if (!selectedFromItem || !selectedToItem) return;

    const localselectedPair = pairs.find((item) => item.from.name === selectedFromItem?.name && item.to.name === selectedToItem?.name)

    setFromItem({
      ...selectedFromItem,
      max: localselectedPair?.max || null,
      min: localselectedPair?.min || null,
    });
    setToItem(selectedToItem);
  }, [isLoading, selectedPair]);

  return { fromItem, toItem, setFromItem, setToItem }
}
