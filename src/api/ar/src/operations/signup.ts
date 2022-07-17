import { Signup } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { Labs } from "../labs";
import {
  SignupUserAuthSignupPostOptionalParams,
  SignupUserAuthSignupPostResponse
} from "../models";

/** Class containing Signup operations. */
export class SignupImpl implements Signup {
  private readonly client: Labs;

  /**
   * Initialize a new instance of the class Signup class.
   * @param client Reference to the service client
   */
  constructor(client: Labs) {
    this.client = client;
  }

  /**
   * Signup User
   * @param options The options parameters.
   */
  userAuthSignupPost(
    options?: SignupUserAuthSignupPostOptionalParams
  ): Promise<SignupUserAuthSignupPostResponse> {
    return this.client.sendOperationRequest(
      { options },
      userAuthSignupPostOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const userAuthSignupPostOperationSpec: coreClient.OperationSpec = {
  path: "/auth/signup",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "any" } }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
