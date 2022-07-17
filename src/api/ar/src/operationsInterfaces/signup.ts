import {
  SignupUserAuthSignupPostOptionalParams,
  SignupUserAuthSignupPostResponse
} from "../models";

/** Interface representing a Signup. */
export interface Signup {
  /**
   * Signup User
   * @param options The options parameters.
   */
  userAuthSignupPost(
    options?: SignupUserAuthSignupPostOptionalParams
  ): Promise<SignupUserAuthSignupPostResponse>;
}
