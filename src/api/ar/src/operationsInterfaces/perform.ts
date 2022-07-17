import {
  PerformHealthcheckExtHealthcheckGetOptionalParams,
  PerformHealthcheckExtHealthcheckGetResponse
} from "../models";

/** Interface representing a Perform. */
export interface Perform {
  /**
   * Check the health of the server.
   *
   * Purpose of this endpoint is to check the health of the server.
   * We check for connection to the database, queue and logger
   * @param options The options parameters.
   */
  healthcheckExtHealthcheckGet(
    options?: PerformHealthcheckExtHealthcheckGetOptionalParams
  ): Promise<PerformHealthcheckExtHealthcheckGetResponse>;
}
