import React, { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router";
import { Navigate, useSearchParams } from "react-router-dom";

import Main from "../pages/Main";
import QrForm from "../pages/QrForm";
import Login from "../pages/Login";
import Header from "./Header";
import Footer from "./Footer";
import { useCreateClient, useGetClientByTG } from "../apis/clients";
import { getCookies } from "../utils/cookie";
import { useCreateTransaction } from "../apis/transactions";
import { useGetPairs } from "../apis/pairs";
import { useGetSelectedPair } from "../hooks/useGetSelectedPair";
import { getResponseList } from "../apis/utils";
import { generateRandomId, getDomainName } from "../utils/utils";
import Cabinet from "../pages/Cabinet";
import PrivateLayout from "./PrivateLayout";
import AuthContextProvider from "../context/authContext";
import { WindowContextProvider } from "../context/sizeContetx";
import Rules from "../pages/Rules";
import FAQ from "../pages/FAQ";
import Contacts from "../pages/Contacts";
import ConfirmedOrder from "../pages/ConfirmedOrder";

function App() {
  const [searchParams] = useSearchParams();
  const clientId = getCookies("clientId");
  const transactionId = getCookies("transactionId");
  const tgIdFromUrl = atob(searchParams.get("value") || "");
  const { status, error, data: clientModel } = useGetClientByTG(tgIdFromUrl);
  const createClientMutation = useCreateClient();
  const createTransactionMutation = useCreateTransaction();
  const { data, isLoading } = useGetPairs(clientModel?.data.model.id);

  const pairs = useMemo(() => getResponseList(data), [data]);

  const { fromItem, toItem } = useGetSelectedPair({
    isLoading,
    pairs,
  });

  useEffect(() => {
    if (transactionId) return;

    if (clientId && toItem && fromItem) {
      createTransactionMutation.mutate({
        status: "visited",
        currencyFromId: fromItem.id,
        currencyToId: toItem.id,
        domain: getDomainName(),
      });
    }
  }, [clientId, transactionId, fromItem, toItem]);

  useEffect(() => {
    if (clientId) return;

    if (tgIdFromUrl) {
      if (status === "error" && error?.response?.status === 404) {
        createClientMutation.mutate(tgIdFromUrl);
      }
    } else {
      createClientMutation.mutate(generateRandomId(8));
    }
  }, [status, error, clientId, tgIdFromUrl]);

  return (
    <WindowContextProvider>
      <div className="font-sans overflow-hidden flex flex-col	justify-between	min-h-screen">
        <div>
          <Header />
          <main className="container mx-auto px-4 mb-20 xl:mt-20 lg:mt-14 md:mt-10 relative">
            <AuthContextProvider>
              <Routes>
                <Route index element={<Main />} />
                <Route path="qr/:id" element={<QrForm />} />
                <Route path="qr/:id/confirmed" element={<ConfirmedOrder />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/cabinet"
                  element={
                    <PrivateLayout>
                      <Cabinet />
                    </PrivateLayout>
                  }
                />
                <Route path="/rules" element={<Rules />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AuthContextProvider>
          </main>
        </div>
        <Footer />
      </div>
    </WindowContextProvider>
  );
}

export default App;
