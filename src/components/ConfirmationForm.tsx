import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { useUpdateTransaction } from "../apis/transactions";
import { IMAGE_URL } from "../apis/utils";
import { TransactionRes, UpdateTransaction } from "../types/transaction";
import { handleCopy } from "../utils/utils";
import Icon from "./Icon";
import ErrorMessage from "./ui/ErrorMessage";
import { useTranslation } from "react-i18next";

interface Props {
  transaction: TransactionRes;
  handleConfirm: VoidFunction;
}

const ConfirmationForm = ({ transaction, handleConfirm }: Props) => {
  const { t } = useTranslation();
  const qrImage = `${IMAGE_URL}${transaction.qr}`;
  const updateTransactionMutation = useUpdateTransaction();

  const handleSubmit = (values: UpdateTransaction) => {
    updateTransactionMutation.mutateAsync(values, {
      onSuccess: handleConfirm,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-3xl blur-bg">
        <div className="p-8">
          <h2 className="text-center font-bold md:text-3xl text-xl mb-5">
            {t("confirmedOrder.request", { code: transaction.code })}
          </h2>
          <Formik
            initialValues={{
              hash: "",
              status: "approved",
            }}
            validationSchema={Yup.object().shape({
              hash: Yup.string()
                // .matches(/^0x([A-Fa-f 0-9]{64})$/, "Must be valid")
                .min(32)
                .required(t("base.required")),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="grid grid-cols-1 gap-y-10 md:grid-cols-5 md:gap-10">
                <div className="col-span-3">
                  <div className="font-bold text-lg mb-6">
                    <p className="mb-4">
                      {t("pairs.transfer")} {transaction.amount}{" "}
                      {transaction.symbol}{" "}
                      {transaction.network && `(${transaction.network})`}
                    </p>
                    <p
                      className="p-2 bg-accent rounded-lg flex justify-between cursor-pointer"
                      onClick={() => handleCopy(`${transaction.amount}`)}
                    >
                      <span className="pr-4">{transaction.amount}</span>
                      <Icon name="content_copy" />
                    </p>
                  </div>
                  <div className="font-bold text-lg mb-6">
                    <p className="mb-4">{`${t("base.to")} ${t(
                      "pairs.wallet"
                    )}`}</p>
                    <p
                      className="text-base p-2 bg-accent rounded-lg flex justify-between cursor-pointer"
                      onClick={() => handleCopy(transaction.address)}
                    >
                      <span className="pr-4 truncate">
                        {transaction.address}
                      </span>
                      <Icon name="content_copy" />
                    </p>
                  </div>
                  <div className="font-bold text-lg mb-6">
                    <p className="mb-4">{t("pairs.hashTransactions")}</p>
                    <Field
                      name="hash"
                      placeholder="Hash"
                      className="rounded-lg bg-main w-full p-3 text-black"
                    />
                    <ErrorMessage name="hash" />
                  </div>
                  <p>{t("pairs.onceYouHaveCompleted")}</p>
                </div>
                <div className="col-span-2 bg-accent p-10 rounded-lg">
                  {transaction.qr && (
                    <img
                      src={qrImage}
                      alt="qr"
                      className="p-5 bg-white rounded-lg"
                    />
                  )}
                  <p className="pt-4 text-xl text-center font-bold">
                    {t("pairs.qrCodeForPayment")}
                  </p>
                </div>
              </div>
              <button
                className="mt-10 py-3 text-lg font-bold rounded-lg bg-accent transition w-full"
                type="submit"
                disabled={updateTransactionMutation.isLoading}
              >
                {t("pairs.iPaid")}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationForm;
