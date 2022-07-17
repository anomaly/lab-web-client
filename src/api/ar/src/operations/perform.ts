import { Perform } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { LabsApi } from "../labsApi";
import {
  PerformHealthcheckExtHealthcheckGetOptionalParams,
  PerformHealthcheckExtHealthcheckGetResponse
} from "../models";

/** Class containing Perform operations. */
export class PerformImpl implements Perform {
  private readonly client: LabsApi;

  /**
   * Initialize a new instance of the class Perform class.
   * @param client Reference to the service client
   */
  constructor(client: LabsApi) {
    this.client = client;
  }

  /**
   * Check the health of the server.
   *
   * Purpose of this endpoint is to check the health of the server.
   * We check for connection to the database, queue and logger
   * @param options The options parameters.
   */
  healthcheckExtHealthcheckGet(
    options?: PerformHealthcheckExtHealthcheckGetOptionalParams
  ): Promise<PerformHealthcheckExtHealthcheckGetResponse> {
    return this.client.sendOperationRequest(
      { options },
      healthcheckExtHealthcheckGetOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const healthcheckExtHealthcheckGetOperationSpec: coreClient.OperationSpec = {
  path: "/ext/healthcheck",
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
