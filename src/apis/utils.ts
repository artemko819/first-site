import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { decamelizeKeys, camelizeKeys } from 'humps';
import { ListRes, ModelRes } from "../types/global";
import { getAuthToken, removeAuthToken } from "../utils/cookie";
import { serialize } from "object-to-formdata";
import { toast } from "react-toastify";

export const IMAGE_URL = 'https://crm.honorexchange.org/';
const BASE_URL = 'https://crm.honorexchange.org/api/v2/';

export const instance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    'Content-Type': 'application/json',
  },
  maxRedirects: 0,
});

export const formApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
  maxRedirects: 0,
});

const camelizeResponse = (response: AxiosResponse): AxiosResponse => {
  return { ...response, data: camelizeKeys(response.data) }
}

const decamelizeRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...request,
    data: decamelizeKeys(request.data),
  }
}


const createFormData = (request: AxiosRequestConfig): AxiosRequestConfig => {
  return { ...request, data: serialize(request.data) };
};

const setAuthToken = (request: AxiosRequestConfig): AxiosRequestConfig => {
  if (!getAuthToken()) return request;
  return {
    ...request,
    headers: {
      ...request.headers,
      'Authorization': `Bearer ${getAuthToken()}`,
    }
  }
}

const filterUrl = (request: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...request,
    url: request.url?.replace(/\/$/, ''),
  }
}

export const defaultErrorHandler = (error: unknown) => {
  const axiosError = error as AxiosError<{error: string}>;
  switch (axiosError.response?.status) {
    case 401:
      console.log('axiosError.response.data.error', axiosError.response.data.error);
      
      toast.error(axiosError.response.data.error);
      removeAuthToken();
      return;

    default:
      break;
  }
  console.log('axiosError.message', axiosError.message);
  
  toast.error(axiosError.message);
};

export const getResponseData = <T>(response: AxiosResponse<T>): T => response.data;
export const getResponseModel = <T>(response: AxiosResponse<ModelRes<T>> | undefined): T => response
  ? getResponseData(response).model
  : {} as T;
export const getResponseList = <T>(response: AxiosResponse<ListRes<T>> | undefined): T[] => response
  ? getResponseData(response).list
  : [];

instance.interceptors.response.use(camelizeResponse);
instance.interceptors.request.use(decamelizeRequest);
instance.interceptors.request.use(setAuthToken);
instance.interceptors.request.use(filterUrl);

formApi.interceptors.request.use(setAuthToken);
formApi.interceptors.request.use(createFormData);
formApi.interceptors.response.use(camelizeResponse);
