import { AxiosRequestConfig } from "axios";

export type TypableApiMethodOptions<QUERY> = {
  query?: QUERY;
  config?: AxiosRequestConfig;
};
