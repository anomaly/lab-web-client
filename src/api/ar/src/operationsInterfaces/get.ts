import {
  GetMeAuthMeGetOptionalParams,
  GetMeAuthMeGetResponse
} from "../models";

/** Interface representing a Get. */
export interface Get {
  /**
   * Get the currently logged in user or myself
   *
   * This endpoint will return the currently logged in user or raise
   * and exception if the user is not logged in.
   * @param options The options parameters.
   */
  meAuthMeGet(
    options?: GetMeAuthMeGetOptionalParams
  ): Promise<GetMeAuthMeGetResponse>;
}
