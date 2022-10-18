import React from "react";
import { Tabs } from "flowbite-react";
import { DocumentIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import Transactions from "../components/Transactions";
import Documents from "../components/Documents";
import ColorStain from "../components/ui/ColorStain";
import { useTranslation } from "react-i18next";

const Cabinet = () => {
  const { t } = useTranslation();
  return (
    <>
      <ColorStain size={100} color="blue" className="u-top-0" />
      <Tabs.Group aria-label="Tabs with icons" style="underline">
        <Tabs.Item title={t("cabinet.transactions")} icon={CreditCardIcon}>
          <Transactions />
        </Tabs.Item>
        <Tabs.Item title={t("cabinet.documents")} icon={DocumentIcon}>
          <Documents />
        </Tabs.Item>
      </Tabs.Group>
      <ColorStain size={300} color="green" className="u-left-90" />
      <ColorStain size={200} color="orange" className="u-top-20" />
    </>
  );
};

export default Cabinet;
