import { Logout } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { LabsApi } from "../labsApi";
import {
  LogoutUserAuthLogoutPostOptionalParams,
  LogoutUserAuthLogoutPostResponse
} from "../models";

/** Class containing Logout operations. */
export class LogoutImpl implements Logout {
  private readonly client: LabsApi;

  /**
   * Initialize a new instance of the class Logout class.
   * @param client Reference to the service client
   */
  constructor(client: LabsApi) {
    this.client = client;
  }

  /**
   * Logout User
   * @param options The options parameters.
   */
  userAuthLogoutPost(
    options?: LogoutUserAuthLogoutPostOptionalParams
  ): Promise<LogoutUserAuthLogoutPostResponse> {
    return this.client.sendOperationRequest(
      { options },
      userAuthLogoutPostOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const userAuthLogoutPostOperationSpec: coreClient.OperationSpec = {
  path: "/auth/logout",
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
