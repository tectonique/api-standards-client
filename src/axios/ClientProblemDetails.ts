import { ProblemDetails } from "@tectonique/api-standards";

export const ClientSideInternalProblemDetail = ProblemDetails.factory({
  status: 900,
  type: "client-side-internal-error",
  title: "Client side internal error",
  payloadType: {} as any,
});

export const ResponseNotAnEnvelopeProblemDetail = ProblemDetails.factory({
  status: 901,
  type: "response-not-an-envelope",
  title: "Response is not an envelope",
  payloadType: {} as any,
});

export const ClientProblemDetailsCollection = {
  ClientSideInternalProblemDetail,
  ResponseNotAnEnvelopeProblemDetail,
};

export type ClientProblemDetailSuperType = ProblemDetails.infer<
  typeof ClientProblemDetailsCollection
>;
