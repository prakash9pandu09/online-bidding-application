import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const axiosInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:5100/api",
    withCredentials: true,
  });
  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error: AxiosError) => error
  );
  return instance;
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "http://localhost:5100/api" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body, params, headers }) => {
    const data = typeof body === 'object' ? body : null;
    try {
      const result = await axiosInstance().request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const commonAPI = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "commonAPI",
  endpoints: () => ({}),
});
