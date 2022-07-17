import {
  LoginUserAuthLoginPostOptionalParams,
  LoginUserAuthLoginPostResponse,
  LoginAuthAccountPostOptionalParams,
  LoginAuthAccountPostResponse
} from "../models";

/** Interface representing a Login. */
export interface Login {
  /**
   * Login a user.
   * @param options The options parameters.
   */
  userAuthLoginPost(
    options?: LoginUserAuthLoginPostOptionalParams
  ): Promise<LoginUserAuthLoginPostResponse>;
  /**
   * Login
   * @param options The options parameters.
   */
  authAccountPost(
    options?: LoginAuthAccountPostOptionalParams
  ): Promise<LoginAuthAccountPostResponse>;
}
