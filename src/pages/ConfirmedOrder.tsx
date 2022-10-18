import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetTransaction } from "../apis/transactions";
import { getResponseModel } from "../apis/utils";
import Loader from "../components/Loader";
import ColorStain from "../components/ui/ColorStain";

const ConfirmedOrder = () => {
  const params = useParams();
  const { data, refetch, isLoading } = useGetTransaction(params.id);
  const transaction = getResponseModel(data);
  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, []);

  const content = [
    t("confirmedOrder.text1"),
    t("confirmedOrder.text2"),
    t("confirmedOrder.text3"),
    t("confirmedOrder.text4"),
    t("confirmedOrder.text5"),
  ];

  if (isLoading) return <Loader />;

  if (!transaction) return null;

  return (
    <>
      <ColorStain size={100} color="orange" className="u-left-75" />
      <div className="h-full w-full flex justify-center items-center">
        <div className="max-w-3xl blur-bg rounded-lg">
          <div className="p-8">
            <h2 className="text-center font-bold md:text-3xl text-xl mb-5">
              {t(
                "confirmedOrder.requestApproved",
                { code: transaction.code } as unknown as string,
                {
                  interpolation: {
                    escapeValue: true,
                  },
                }
              )}
            </h2>
            {content.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
      </div>
      <ColorStain size={300} color="blue" />
    </>
  );
};

export default ConfirmedOrder;
