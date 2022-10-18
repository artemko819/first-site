import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetTransactions } from "../apis/cabinet";
import { getResponseList } from "../apis/utils";
import { CreatedTransaction } from "../types/transaction";
import { getStatusColor, handleCopy } from "../utils/utils";
import Icon from "./Icon";
import Loader from "./Loader";

const Transactions = () => {
  const { data, isLoading } = useGetTransactions();
  const transactions = useMemo(() => getResponseList(data), [data]);
  const { t } = useTranslation()

  if (isLoading) return <Loader />;

  const getRows = (transaction: CreatedTransaction) => [
    {
      name: t("transactions.address"),
      value: (
        <p
          className="text-base p-1 bg-accent rounded-lg flex justify-between cursor-pointer max-w-[80%]"
          onClick={() => handleCopy(transaction.address)}
        >
          <span className="pr-2 md:pr-4 truncate max-w-[160px] md:max-w-[200px]">
            {transaction.address}
          </span>
          <Icon name="content_copy" />
        </p>
      ),
    },
    {
      name: t("transactions.pair"),
      value: transaction.currency,
    },
    {
      name: t("transactions.amount"),
      value: `${transaction.amountFrom}/${transaction.amountTo}`,
    },
    {
      name: t("transactions.status"),
      value: (
        <span style={{ color: getStatusColor(transaction.status) }}>
          {transaction.status}
        </span>
      ),
    },
    {
      name: t("transactions.created"),
      value: new Date(transaction.createdAt).toLocaleString(),
    },
    {
      hide: !transaction.retention,
      name: t("transactions.info"),
      value: (
        <span className="text-red-600">
          {transaction.retention?.text}
          <br />
          {transaction.retention?.comment && (
            <span className="text-yellow-600">
              {transaction.retention?.comment}
            </span>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="blur-bg rounded-lg">
          <div className="p-4">
            <p className="text-center">{t('order')} {transaction.code}</p>
            <table className="border-separate border-spacing-y-2">
              <tbody>
                {getRows(transaction).map(
                  (row) =>
                    !row.hide && (
                      <tr key={row.name} className="mt-2">
                        <td className="pr-2">{row.name}:</td>
                        <td>{row.value}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
