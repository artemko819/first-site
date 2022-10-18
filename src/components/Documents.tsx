import { Formik, Form } from "formik";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCreateDoc, useGetDocs } from "../apis/cabinet";
import { getResponseList } from "../apis/utils";
import { DocumentsForm } from "../types/document";
import Loader from "./Loader";
import FileField from "./ui/FileField";

const Documents = () => {
  const { data, isLoading } = useGetDocs();
  const createDocMutatiion = useCreateDoc();
  const { t } = useTranslation();

  const docs = useMemo(() => getResponseList(data), [data]);
  const docPathes = useMemo(
    () => getResponseList(data).map((item) => item.path),
    [data]
  );

  const handleSabmit = (values: DocumentsForm) => {
    createDocMutatiion.mutate(values);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          documents: docPathes,
        }}
        onSubmit={handleSabmit}
      >
        <Form>
          <FileField name="documents" isMulti documents={docs} />
          <button
            type="submit"
            className="rounded-lg mt-6 bg-accent text-white w-full py-3 transition"
          >
            {t("base.save")}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Documents;
