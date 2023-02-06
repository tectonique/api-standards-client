import { ProblemDetails } from "@tectonique/api-standards";
import ClientProblemDetailsCollection from "./ClientProblemDetailsCollection";

type ClientProblemDetailSuperType = ProblemDetails.infer<
  typeof ClientProblemDetailsCollection
>;

export default ClientProblemDetailSuperType;
