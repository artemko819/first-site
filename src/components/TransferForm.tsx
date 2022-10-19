import React, { useState, useEffect, useMemo, memo, useRef } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "crypto-address-validator-ts";

// import Icon from "./Icon";
import ErrorMessage from "./ui/ErrorMessage";
import { Currency, CurrencyFrom } from "../types/pair";
import { useUpdateTransaction } from "../apis/transactions";
import { Transaction, TransactionForm } from "../types/transaction";
import { getCookies } from "../utils/cookie";
import { useTranslation } from "react-i18next";
import { isLocal } from "../utils/utils";
import { getCurrencyName } from "../utils/formats";

interface Props {
  fromItem: CurrencyFrom;
  toItem: Currency;
  rate: string;
  renderRate: string;
  percent: number;
  amount: number;
  children:any
}

const TransferForm = ({
  fromItem,
  toItem,
  rate,
  percent,
  amount,
  // renderRate,
  children
}: Props) => {
  const formikRef: React.Ref<FormikProps<TransactionForm>> | null =
    useRef(null);
  const { t } = useTranslation();

  const generalValidation = useMemo(
    () => ({
      email: Yup.string()
        .email(t("base.emailIsInvalid"))
        .required(t("base.required")),
      addressSending: Yup.string().required(t("base.required")),
      amountFrom: Yup.number()
        .typeError(t("base.mustBeANumber"))
        .required(t("base.required")),
      amountTo: Yup.number()
        .typeError(t("base.mustBeANumber"))
        .required(t("base.required")),
    }),
    [t]
  );

  const navigate = useNavigate();
  const [validation, setValidation] = useState(generalValidation);
  const updateTransactionMutation = useUpdateTransaction();

  const emailFromCookies = useMemo(() => getCookies("email") || "", []);

  useEffect(() => {
    if (formikRef.current) {
      const { setFieldValue, values } = formikRef.current;
      const newAmount = values.amountFrom * Number(rate);
      setFieldValue("amountTo", newAmount);
    }
  }, [rate]);

  useEffect(() => {
    setValidation((prevState) => ({
      ...prevState,
      amountFrom: Yup.number()
        .max(fromItem.max || 100000)
        .min(fromItem.min || 1)
        .typeError("Must be a number")
        .required(t("base.required")),
      addressSending: Yup.string()
        .test("crypto-validate", "Wallet is not valid", (value) => {
          if (isLocal()) return true;
          if (toItem.network === "TRC20" && value) {
            return /T[A-Za-z1-9]{33}/.test(value);
          }

          return validate(value as string, toItem.symbol, {
            networkType: toItem.network || toItem.symbol,
            chainType: "",
          });
        })
        .required(t("base.required")),
    }));
    formikRef.current?.validateForm();
  }, [fromItem, t, toItem]);

  const initialValues: TransactionForm = {
    email: emailFromCookies,
    addressSending: "",
    amountFrom: fromItem.min || 1,
    amountTo: 0,
  };

  const handleSubmit = async (values: TransactionForm) => {
    const data: Transaction = {
      ...values,
      currencyFromId: fromItem.id,
      currencyToId: toItem.id,
      status: "created",
      amount: amount * Number(values.amountFrom),
      percent,
    };
    updateTransactionMutation.mutateAsync(data, {
      onSuccess: (data) => navigate(`/qr/${data.data.model.id}`),
    });
  };

  return (
    <div className="grid grid-flow-col sm:auto-cols-[minmax(290px,_2fr)] lg:auto-cols-[minmax(734px,_2fr)] self-center items-center ">
      {/* <div className="flex items-baseline flex-col">
        <p className="font-bold text-lg md:text-2xl">
          <Icon className="mr-3 text-base md:text-lg" name="sync" />
          <span>{t("pairs.exchange")}</span>
        </p>
        <p className="ml-5 text-base md:text-lg text-secondaryText">
          {t("pairs.exchangeRate")}:{" "}
          <span className="block md:inline">{renderRate}</span>
        </p>
        <p className="ml-5 text-base md:text-lg text-secondaryText">
          {`${t("pairs.available")}: ${toItem.available}`}
        </p>
      </div> */}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape(validation)}
        enableReinitialize
        innerRef={formikRef}
      >
        {({ setFieldValue, isValid }) => {
          return (
            <Form className="blur-bg w-full rounded-lg mt-3">
              <div className="lg:p-12 sm:p-3 ">
                {children}
                <div className="grid-cols-2 grid ">
                  <div className="flex flex-col justify-between mr-5">
                    <p>
                      {t("pairs.weChange")} {getCurrencyName(fromItem)}
                    </p>
                    {fromItem.min && fromItem.max && (
                      <span className="text-sm text-secondaryText">
                        ({t("base.min")} - {fromItem.min}, {t("base.max")} -{" "}
                        {fromItem.max})
                      </span>
                    )}
                    <div>
                      <div>
                        <Field
                          name="amountFrom"
                          placeholder={fromItem.min}
                          className="mt-3  bg-main w-full p-3 text-black"
                          type="number"
                          onChange={(
                            e: React.ChangeEvent<{ value: string }>
                          ) => {
                            setFieldValue("amountFrom", e.target.value);
                            setFieldValue(
                              "amountTo",
                              Number(e.target.value) * Number(rate)
                            );
                          }}
                        />
                        <ErrorMessage name="amountFrom" />
                      </div>
                      <div>
                        <Field
                          disabled={!!emailFromCookies}
                          name="email"
                          placeholder="E-mail"
                          className="mt-3  bg-main w-full p-3 text-black"
                        />
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                  </div>
                  <div className="lg:ml-5 xl:ml-5 sm:ml-4 flex flex-col justify-between">
                    <p>
                      {t("base.to")} {getCurrencyName(toItem)}
                    </p>
                    <div>
                      <div>
                        <Field
                          name="amountTo"
                          placeholder="400"
                          className="mt-3  bg-main w-full p-3 text-black"
                          type="number"
                          disabled
                        />
                        <ErrorMessage name="amountTo" />
                      </div>
                      <div>
                        <Field
                          name="addressSending"
                          placeholder={`${getCurrencyName(toItem)} ${t(
                            "pairs.wallet"
                          )}`}
                          className="mt-3  bg-main w-full p-3 text-black"
                        />
                        <ErrorMessage name="addressSending" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-secondaryText text-center text-sm mt-4">
                  {t("pairs.pushingTheButton")}{" "}
                  <Link className="underline text-white" to="/rules">
                    {t("headerLinks.rules")}
                  </Link>
                  .
                </p>
                <button
                  type="submit"
                  className="rounded-lg lg:text-2xl sm:text-[14px] mt-4 bg-accent text-white w-full py-3 transition"
                >
                  {t("pairs.proceedToCheckout")}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default memo(TransferForm);
