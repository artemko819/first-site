import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DocumentRes, DocumentsForm } from '../types/document';
import { ListRes } from '../types/global';
import { CreatedTransaction } from '../types/transaction';
import { instance, formApi } from './utils';

const BASE_URL = 'cabinet';
const TRANSACTIONS = 'TRANSACTIONS';
const DOCUMENTS = 'DOCUMENTS';

export const useGetTransactions = () => useQuery<unknown, unknown, AxiosResponse<ListRes<CreatedTransaction>>>(
  [TRANSACTIONS],
  () => instance.get(`${BASE_URL}/transactions`),
);

export const useGetDocs = () => useQuery<unknown, unknown, AxiosResponse<ListRes<DocumentRes>>>(
  [DOCUMENTS],
  () => instance.get(`${BASE_URL}/documents`),
);

export const useCreateDoc = () => {
  const queryClient = useQueryClient()
  return useMutation<AxiosResponse<ListRes<DocumentRes>>, unknown, DocumentsForm>(
    (data) => formApi.post(`${BASE_URL}/documents`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(DOCUMENTS)
      },
    }
  );
}

export const useDeleteDoc = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, string>((id) =>
    instance.delete(`${BASE_URL}/documents/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(DOCUMENTS)
      },
    }
  );
}
