import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { Client } from "../types/client";
import { setCookies } from "../utils/cookie";
import { instance } from "./utils";

const BASE_URL = 'clients';
const CLIENT = 'CLIENT';
const CREATED_CLIENT = 'CREATED_CLIENT';

export const useGetClientByTG = (tgId: string) => useQuery<AxiosResponse<{ model: Client }>, AxiosError>(
  [CLIENT],
  () => instance.get(`${BASE_URL}/tg/${tgId}`),
  {
    enabled: !!tgId,
    onSuccess: (data) => setCookies('clientId', data.data.model.id),
    onError: () => {},
  }
)

export const useCreateClient = () => useMutation<AxiosResponse<{ model: Client }>, unknown, string>((tgId: string) =>
  instance.post(BASE_URL, {
    telegramId: tgId,
    notificationStatus: 1,
    inviteName: "invite name",
    inviteLink: "invite link",
    affiliate: "self_sid"
  }), {
  mutationKey: [CREATED_CLIENT],
  onSuccess: (data) => setCookies('clientId', data.data.model.id),
});
