import { Root } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { Labs } from "../labs";
import { RootGetOptionalParams, RootGetResponse } from "../models";

/** Class containing Root operations. */
export class RootImpl implements Root {
  private readonly client: Labs;

  /**
   * Initialize a new instance of the class Root class.
   * @param client Reference to the service client
   */
  constructor(client: Labs) {
    this.client = client;
  }

  /**
   * Placeholder for the root endpoint
   *
   * @param options The options parameters.
   */
  get(options?: RootGetOptionalParams): Promise<RootGetResponse> {
    return this.client.sendOperationRequest({ options }, getOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/",
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
