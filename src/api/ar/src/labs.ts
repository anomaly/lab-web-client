import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import {
  VerifyImpl,
  GetImpl,
  LoginImpl,
  LogoutImpl,
  SignupImpl,
  EchoImpl,
  PerformImpl,
  WriteImpl,
  RootImpl
} from "./operations";
import {
  Verify,
  Get,
  Login,
  Logout,
  Signup,
  Echo,
  Perform,
  Write,
  Root
} from "./operationsInterfaces";
import { LabsOptionalParams } from "./models";

export class Labs extends coreClient.ServiceClient {
  $host: string;

  /**
   * Initializes a new instance of the Labs class.
   * @param options The parameter options
   */
  constructor(options?: LabsOptionalParams) {
    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: LabsOptionalParams = {
      requestContentType: "application/json; charset=utf-8"
    };

    const packageDetails = `azsdk-js-labs/1.0.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri:
        options.endpoint ?? options.baseUri ?? "https://localhost:3000/api"
    };
    super(optionsWithDefaults);

    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] = options.pipeline.getOrderedPolicies();
      const bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName
      );
      if (!bearerTokenAuthenticationPolicyFound) {
        this.pipeline.removePolicy({
          name: coreRestPipeline.bearerTokenAuthenticationPolicyName
        });
        this.pipeline.addPolicy(
          coreRestPipeline.bearerTokenAuthenticationPolicy({
            scopes: `${optionsWithDefaults.baseUri}/.default`,
            challengeCallbacks: {
              authorizeRequestOnChallenge:
                coreClient.authorizeRequestOnClaimChallenge
            }
          })
        );
      }
    }

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://localhost:3000/api";
    this.verify = new VerifyImpl(this);
    this.get = new GetImpl(this);
    this.login = new LoginImpl(this);
    this.logout = new LogoutImpl(this);
    this.signup = new SignupImpl(this);
    this.echo = new EchoImpl(this);
    this.perform = new PerformImpl(this);
    this.write = new WriteImpl(this);
    this.root = new RootImpl(this);
  }

  verify: Verify;
  get: Get;
  login: Login;
  logout: Logout;
  signup: Signup;
  echo: Echo;
  perform: Perform;
  write: Write;
  root: Root;
}
