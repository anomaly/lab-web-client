import { Verify } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { Labs } from "../labs";
import {
  VerifyUserAccountAuthVerifyGetOptionalParams,
  VerifyUserAccountAuthVerifyGetResponse
} from "../models";

/** Class containing Verify operations. */
export class VerifyImpl implements Verify {
  private readonly client: Labs;

  /**
   * Initialize a new instance of the class Verify class.
   * @param client Reference to the service client
   */
  constructor(client: Labs) {
    this.client = client;
  }

  /**
   * Verify an account
   *
   * @param options The options parameters.
   */
  userAccountAuthVerifyGet(
    options?: VerifyUserAccountAuthVerifyGetOptionalParams
  ): Promise<VerifyUserAccountAuthVerifyGetResponse> {
    return this.client.sendOperationRequest(
      { options },
      userAccountAuthVerifyGetOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const userAccountAuthVerifyGetOperationSpec: coreClient.OperationSpec = {
  path: "/auth/verify",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "any" } }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
