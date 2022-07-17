import {
  VerifyUserAccountAuthVerifyGetOptionalParams,
  VerifyUserAccountAuthVerifyGetResponse
} from "../models";

/** Interface representing a Verify. */
export interface Verify {
  /**
   * Verify an account
   *
   * @param options The options parameters.
   */
  userAccountAuthVerifyGet(
    options?: VerifyUserAccountAuthVerifyGetOptionalParams
  ): Promise<VerifyUserAccountAuthVerifyGetResponse>;
}
