import { ProblemDetails } from "@tectonique/api-standards";
import { ClientProblemDetailsCollection } from "./index";

export type ClientProblemDetailSuperType = ProblemDetails.infer<
  typeof ClientProblemDetailsCollection
>;
