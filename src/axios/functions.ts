import { AxiosInstance, AxiosResponse } from "axios";
import { TypableApiMethodOptions } from "./types";
import { ProblemDetails, ResponseEnvelopes } from "@tectonique/api-standards";
import { ClientProblemDetailsCollection } from "../ClientProblemDetails";

const { ClientSideInternalProblemDetail, ResponseNotAnEnvelopeProblemDetail } =
  ClientProblemDetailsCollection;

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
      const isEnvelope = ResponseEnvelopes.isOne(response.data);
      if (isEnvelope) {
        return response.data as ResponseEnvelopes.Envelope<
          PROBLEM_DETAIL,
          RESPONSE
        >;
      }

      return ResponseNotAnEnvelopeProblemDetail({
        payload: response.data,
      }) as PROBLEM_DETAIL;
    })
    .catch((reason) => {
      if (ProblemDetails.isOne(reason?.response?.data)) {
        return reason.response.data as PROBLEM_DETAIL;
      }

      return ClientSideInternalProblemDetail({
        detail: reason?.message,
        payload: reason,
      }) as PROBLEM_DETAIL;
    });
}

export default function makeAxiosTypeSafe<
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
