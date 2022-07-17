import {
  LogoutUserAuthLogoutPostOptionalParams,
  LogoutUserAuthLogoutPostResponse
} from "../models";

/** Interface representing a Logout. */
export interface Logout {
  /**
   * Logout User
   * @param options The options parameters.
   */
  userAuthLogoutPost(
    options?: LogoutUserAuthLogoutPostOptionalParams
  ): Promise<LogoutUserAuthLogoutPostResponse>;
}
