import { RootGetOptionalParams, RootGetResponse } from "../models";

/** Interface representing a Root. */
export interface Root {
  /**
   * Placeholder for the root endpoint
   *
   * @param options The options parameters.
   */
  get(options?: RootGetOptionalParams): Promise<RootGetResponse>;
}
