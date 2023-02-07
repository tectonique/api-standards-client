import { AxiosInstance, AxiosResponse } from "axios";
import { TypableApiMethodOptions } from "./types";
import { ProblemDetails, ResponseEnvelopes } from "@tectonique/api-standards";
import { ClientProblemDetailsCollection } from "../ClientProblemDetails";

const { ClientSideInternalProblemDetail, ResponseNotAnEnvelopeProblemDetail } =
  ClientProblemDetailsCollection;

export function createTypeSafeAxios<
  PROBLEM_DETAIL_SUPER_TYPE extends ProblemDetails.ProblemDetail<
    SUPER_STATUS,
    SUPER_TYPE,
    SUPER_PAYLOAD
  >,
  SUPER_STATUS extends number = PROBLEM_DETAIL_SUPER_TYPE["status"],
  SUPER_TYPE extends string = PROBLEM_DETAIL_SUPER_TYPE["type"],
  SUPER_PAYLOAD = PROBLEM_DETAIL_SUPER_TYPE["payload"]
>(axios: AxiosInstance) {
  return {
    verbs: createTypedAxiosVerbs<PROBLEM_DETAIL_SUPER_TYPE>(axios),

    createProblemDetailHandler:
      createTypedCreateProblemDetailHandler<PROBLEM_DETAIL_SUPER_TYPE>(),

    handleProblemDetail:
      createTypedHandleProblemDetail<PROBLEM_DETAIL_SUPER_TYPE>(),
  };
}

function createTypedCreateProblemDetailHandler<
  PROBLEM_DETAIL_SUPER_TYPE extends ProblemDetails.ProblemDetail<
    SUPER_STATUS,
    SUPER_TYPE,
    SUPER_PAYLOAD
  >,
  SUPER_STATUS extends number = PROBLEM_DETAIL_SUPER_TYPE["status"],
  SUPER_TYPE extends string = PROBLEM_DETAIL_SUPER_TYPE["type"],
  SUPER_PAYLOAD = PROBLEM_DETAIL_SUPER_TYPE["payload"]
>() {
  const handleProblemDetail =
    createTypedHandleProblemDetail<PROBLEM_DETAIL_SUPER_TYPE>();

  return function (
    handler: (problemDetail: PROBLEM_DETAIL_SUPER_TYPE) => void | Promise<void>
  ) {
    return function (reason: any) {
      return handleProblemDetail(reason, handler);
    };
  };
}

export function createTypedHandleProblemDetail<
  PROBLEM_DETAIL_SUPER_TYPE extends ProblemDetails.ProblemDetail<
    SUPER_STATUS,
    SUPER_TYPE,
    SUPER_PAYLOAD
  >,
  SUPER_STATUS extends number = PROBLEM_DETAIL_SUPER_TYPE["status"],
  SUPER_TYPE extends string = PROBLEM_DETAIL_SUPER_TYPE["type"],
  SUPER_PAYLOAD = PROBLEM_DETAIL_SUPER_TYPE["payload"]
>() {
  return function (
    reason: any,
    handler: (problemDetail: PROBLEM_DETAIL_SUPER_TYPE) => void | Promise<void>
  ) {
    if (ProblemDetails.isOne(reason)) {
      return handler(reason as PROBLEM_DETAIL_SUPER_TYPE);
    }

    return Promise.reject(reason);
  };
}

export function createTypedAxiosVerbs<
  PROBLEM_DETAIL_SUPER_TYPE extends ProblemDetails.ProblemDetail<
    SUPER_STATUS,
    SUPER_TYPE,
    SUPER_PAYLOAD
  >,
  SUPER_STATUS extends number = PROBLEM_DETAIL_SUPER_TYPE["status"],
  SUPER_TYPE extends string = PROBLEM_DETAIL_SUPER_TYPE["type"],
  SUPER_PAYLOAD = PROBLEM_DETAIL_SUPER_TYPE["payload"]
>(axios: AxiosInstance) {
  return {
    get: <RESPONSE, QUERY>(
      url: string,
      options?: TypableApiMethodOptions<QUERY>
    ): Promise<
      ResponseEnvelopes.Envelope<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>
    > => {
      return handleAxiosResponse<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>(
        axios.get<RESPONSE>(url, {
          ...options?.config,
          params: options?.query,
        })
      );
    },

    post: <RESPONSE, BODY, QUERY>(
      url: string,
      body: BODY,
      options?: TypableApiMethodOptions<QUERY>
    ): Promise<
      ResponseEnvelopes.Envelope<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>
    > => {
      return handleAxiosResponse<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>(
        axios.post<RESPONSE>(url, body, {
          ...options?.config,
          params: options?.query,
        })
      );
    },

    put: <RESPONSE, BODY, QUERY>(
      url: string,
      body: BODY,
      options?: TypableApiMethodOptions<QUERY>
    ): Promise<
      ResponseEnvelopes.Envelope<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>
    > => {
      return handleAxiosResponse<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>(
        axios.put<RESPONSE>(url, body, {
          ...options?.config,
          params: options?.query,
        })
      );
    },

    patch: <RESPONSE, BODY, QUERY>(
      url: string,
      body: BODY,
      options?: TypableApiMethodOptions<QUERY>
    ): Promise<
      ResponseEnvelopes.Envelope<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>
    > => {
      return handleAxiosResponse<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>(
        axios.patch<RESPONSE>(url, body, {
          ...options?.config,
          params: options?.query,
        })
      );
    },

    delete: <RESPONSE, QUERY>(
      url: string,
      options?: TypableApiMethodOptions<QUERY>
    ): Promise<
      ResponseEnvelopes.Envelope<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>
    > => {
      return handleAxiosResponse<PROBLEM_DETAIL_SUPER_TYPE, RESPONSE>(
        axios.delete<RESPONSE>(url, {
          ...options?.config,
          params: options?.query,
        })
      );
    },
  };
}

function handleAxiosResponse<
  PROBLEM_DETAIL extends ProblemDetails.ProblemDetail<STATUS, TYPE, PAYLOAD>,
  RESPONSE,
  STATUS extends number = PROBLEM_DETAIL["status"],
  TYPE extends string = PROBLEM_DETAIL["type"],
  PAYLOAD = PROBLEM_DETAIL["payload"]
>(
  axiosPromise: Promise<AxiosResponse<RESPONSE>>
): Promise<ResponseEnvelopes.Envelope<PROBLEM_DETAIL, RESPONSE>> {
  return axiosPromise
    .then((response) => {
      if (ResponseEnvelopes.isOne(response.data)) {
        return response.data as ResponseEnvelopes.Envelope<
          PROBLEM_DETAIL,
          RESPONSE
        >;
      }

      return Promise.reject(
        ResponseNotAnEnvelopeProblemDetail({
          payload: response.data,
        })
      );
    })
    .catch((reason) => {
      if (ProblemDetails.isOne(reason?.response?.data)) {
        return Promise.reject(reason);
      }

      // All other errors get wrapped
      return Promise.reject(
        ClientSideInternalProblemDetail({
          detail: reason?.message,
          payload: reason,
        })
      );
    });
}
