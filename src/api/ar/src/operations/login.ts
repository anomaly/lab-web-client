import { Login } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { Labs } from "../labs";
import {
  LoginUserAuthLoginPostOptionalParams,
  LoginUserAuthLoginPostResponse,
  LoginAuthAccountPostOptionalParams,
  LoginAuthAccountPostResponse
} from "../models";

/** Class containing Login operations. */
export class LoginImpl implements Login {
  private readonly client: Labs;

  /**
   * Initialize a new instance of the class Login class.
   * @param client Reference to the service client
   */
  constructor(client: Labs) {
    this.client = client;
  }

  /**
   * Login a user.
   * @param options The options parameters.
   */
  userAuthLoginPost(
    options?: LoginUserAuthLoginPostOptionalParams
  ): Promise<LoginUserAuthLoginPostResponse> {
    return this.client.sendOperationRequest(
      { options },
      userAuthLoginPostOperationSpec
    );
  }

  /**
   * Login
   * @param options The options parameters.
   */
  authAccountPost(
    options?: LoginAuthAccountPostOptionalParams
  ): Promise<LoginAuthAccountPostResponse> {
    return this.client.sendOperationRequest(
      { options },
      authAccountPostOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const userAuthLoginPostOperationSpec: coreClient.OperationSpec = {
  path: "/auth/login",
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
const authAccountPostOperationSpec: coreClient.OperationSpec = {
  path: "/auth/account",
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
