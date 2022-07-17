import { Get } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { LabsApi } from "../labsApi";
import {
  GetMeAuthMeGetOptionalParams,
  GetMeAuthMeGetResponse
} from "../models";

/** Class containing Get operations. */
export class GetImpl implements Get {
  private readonly client: LabsApi;

  /**
   * Initialize a new instance of the class Get class.
   * @param client Reference to the service client
   */
  constructor(client: LabsApi) {
    this.client = client;
  }

  /**
   * Get the currently logged in user or myself
   *
   * This endpoint will return the currently logged in user or raise
   * and exception if the user is not logged in.
   * @param options The options parameters.
   */
  meAuthMeGet(
    options?: GetMeAuthMeGetOptionalParams
  ): Promise<GetMeAuthMeGetResponse> {
    return this.client.sendOperationRequest(
      { options },
      meAuthMeGetOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const meAuthMeGetOperationSpec: coreClient.OperationSpec = {
  path: "/auth/me",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.User
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
