import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Transaction, TransactionRes, UpdateTransaction } from '../types/transaction';
import { getCookies, removeCookies, setCookies } from '../utils/cookie';
import { instance } from './utils';

const TRANSACTION = "TRANSACTION"
const BASE_URL = 'transactions';

export const useCreateTransaction = () => useMutation<AxiosResponse<{ model: TransactionRes }>, unknown, Transaction>((data) =>
  instance.post(BASE_URL, { ...data, clientId: getCookies('clientId') }),
  {
    onSuccess: (res, variable) => {
      if (variable.status === "visited") {
        setCookies('transactionId', res.data.model.id);
      }
    },
  }
);

export const useUpdateTransaction = () =>
  useMutation<AxiosResponse<{ model: TransactionRes }>, unknown, UpdateTransaction>((data) =>
    instance.post(`${BASE_URL}/${getCookies('transactionId')}`, data), {
    onSuccess: (res, variable) => {
      if (variable.status === "approved") {
        removeCookies('transactionId');
      }
      if (res.data.model?.clientId) {
        setCookies('clientId', res.data.model.clientId)
      }
    },
  }
  );

export const useGetTransaction = (id?: string) =>
  useQuery<AxiosResponse<{ model: TransactionRes }>, unknown>(
    [TRANSACTION, id],
    () => instance.get(`${BASE_URL}/${id}`),
    {
      enabled: false,
    }
  );
