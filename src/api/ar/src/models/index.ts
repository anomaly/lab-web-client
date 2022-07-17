import * as coreClient from "@azure/core-client";

/**
 * User profile
 *
 */
export interface User {
  /** Created At */
  createdAt: Date;
  /** Updated At */
  updatedAt: Date;
  /** Id */
  id: string;
  /** Email */
  email: string;
  /** Mobile Phone */
  mobilePhone: string;
  /** Verified */
  verified: boolean;
  /** First Name */
  firstName: string;
  /** Last Name */
  lastName: string;
}

/** Optional parameters. */
export interface VerifyUserAccountAuthVerifyGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the userAccountAuthVerifyGet operation. */
export type VerifyUserAccountAuthVerifyGetResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface GetMeAuthMeGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the meAuthMeGet operation. */
export type GetMeAuthMeGetResponse = User;

/** Optional parameters. */
export interface LoginUserAuthLoginPostOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the userAuthLoginPost operation. */
export type LoginUserAuthLoginPostResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface LoginAuthAccountPostOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the authAccountPost operation. */
export type LoginAuthAccountPostResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface LogoutUserAuthLogoutPostOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the userAuthLogoutPost operation. */
export type LogoutUserAuthLogoutPostResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface SignupUserAuthSignupPostOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the userAuthSignupPost operation. */
export type SignupUserAuthSignupPostResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface EchoExtEchoGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the extEchoGet operation. */
export type EchoExtEchoGetResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface PerformHealthcheckExtHealthcheckGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the healthcheckExtHealthcheckGet operation. */
export type PerformHealthcheckExtHealthcheckGetResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface WriteToLoggerExtLogGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the toLoggerExtLogGet operation. */
export type WriteToLoggerExtLogGetResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface RootGetOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the get operation. */
export type RootGetResponse = {
  /** The parsed response body. */
  body: any;
};

/** Optional parameters. */
export interface LabsApiOptionalParams extends coreClient.ServiceClientOptions {
  /** server parameter */
  $host?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
