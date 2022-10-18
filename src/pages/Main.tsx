import React, { useEffect, useMemo } from "react";
import { useGetPairs } from "../apis/pairs";
import { getResponseList } from "../apis/utils";
import Loader from "../components/Loader";

import Pairs from "../components/Pairs";
import TechnicalProblem from "../components/TechnicalProblems";
import TransferForm from "../components/TransferForm";
import ColorStain from "../components/ui/ColorStain";
import { useGetRate } from "../hooks/useGetRate";
import { useGetSelectedPair } from "../hooks/useGetSelectedPair";
import { useGetUniquePairs } from "../hooks/useGetUniquePairs";

const Main = () => {
  const { data, isLoading, isError } = useGetPairs();
  const pairs = useMemo(() => getResponseList(data), [data]);

  const { fromItem, toItem, setFromItem, setToItem } = useGetSelectedPair({
    isLoading,
    pairs,
  });
  const { uniqueCurrenciesFrom, uniqueCurrenciesTo } = useGetUniquePairs({
    isLoading,
    pairs,
  });

  const percent = useMemo(() => {
    const selectedPair = pairs.find(
      (pair) => pair.from.id === fromItem?.id && pair.to.id === toItem?.id
    );
    return selectedPair ? selectedPair.percent : 0;
  }, [toItem, fromItem, pairs]);

  const { rate, amount, renderRate } = useGetRate({
    fromItem,
    toItem,
    percent,
  });

  if (isError) return <TechnicalProblem />;

  if (!fromItem || !toItem) return <Loader />;

  return (
    <>
      {/* <ColorStain size={300} color="violet" /> */}
      <div className="lg:flex justify-center flex-col rounded-lg md:grid-cols-1 mt-3 md:grid md:grid-cols-5 gap-y-10 md:gap-10">
        <h1 className=" text-center leading-10 xl:text-6xl lg:text-4xl  sm:text-3xl  leading-4 sm:mb-3">
          Удобный сервис для обмена валюты
        </h1>
        <h2 className="text-center xl:text-[32px] lg:text-[22px] md:leading-10 sm:text-[18px] sm:mb-3 sm:leading-5">Онлайн обменник криптовалют и электронных денег HestiaexChange</h2>
        <p className="text-center lg:text-[22px] lg:leading-8  sm:text-[14px]  sm:leading-4">
          Онлайн обменник HestiaexChange предоставляет возможность купить,
          продать или обменять криптовалюту в любое удобное время. Мы предлагаем
          максимально выгодные курсы и не взимаем комиссий. Большинство операций
          проводится в автоматическом режиме, обмен в среднем занимает от 5
          до 30 минут.
        </p>
        <h3 className="lg:text-[35px] sm:text-[16px] text-center">
          Выберите одно из направлений обмена
        </h3>
        <TransferForm
          fromItem={fromItem}
          toItem={toItem}
          rate={rate}
          renderRate={renderRate}
          percent={percent}
          amount={amount}
        >
          <Pairs
            toItem={toItem}
            fromItem={fromItem}
            currenciesFrom={uniqueCurrenciesFrom}
            currenciesTo={uniqueCurrenciesTo}
            setFromItem={setFromItem}
            setToItem={setToItem}
          />
        </TransferForm>
      </div>
      {/* <ColorStain size={100} color="orange" className="u-left-75" /> */}
    </>
  );
};

export default Main;
