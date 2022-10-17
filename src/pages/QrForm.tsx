import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useGetTransaction } from "../apis/transactions";
import { getResponseModel } from "../apis/utils";
import ConfirmationForm from "../components/ConfirmationForm";
import ColorStain from "../components/ui/ColorStain";
import Loader from "../components/Loader";

const QrForm = () => {
  const params = useParams();
  const { data, refetch, isRefetching } = useGetTransaction(params.id);
  const transaction = getResponseModel(data);
  const navigate = useNavigate();

  useEffect(() => {
    refetch()
  }, []);

  const handleConfirm = () => {
    toast.success("Approved!");
    navigate(`/qr/${params.id}/confirmed`);
  };

  if (isRefetching) return <Loader />;

  if (!transaction) return null;

  return (
    <>
      <ColorStain size={100} color="green" className="u-left-90" />
      <ConfirmationForm
        handleConfirm={handleConfirm}
        transaction={transaction}
      />
      <ColorStain size={300} color="blue" />
    </>
  );
};

export default QrForm;
