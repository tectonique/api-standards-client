import { ProblemDetails } from "@tectonique/api-standards";

const ClientSideInternalProblemDetail = ProblemDetails.factory({
  status: 900,
  type: "client-side-internal-error",
  title: "Client side internal error",
  payloadType: {} as any,
});

const ResponseNotAnEnvelopeProblemDetail = ProblemDetails.factory({
  status: 901,
  type: "response-not-an-envelope",
  title: "Response is not an envelope",
  payloadType: {} as any,
});

export const ClientProblemDetailsCollection = {
  ClientSideInternalProblemDetail,
  ResponseNotAnEnvelopeProblemDetail,
};
