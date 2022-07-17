import { Echo } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { LabsApi } from "../labsApi";
import {
  EchoExtEchoGetOptionalParams,
  EchoExtEchoGetResponse
} from "../models";

/** Class containing Echo operations. */
export class EchoImpl implements Echo {
  private readonly client: LabsApi;

  /**
   * Initialize a new instance of the class Echo class.
   * @param client Reference to the service client
   */
  constructor(client: LabsApi) {
    this.client = client;
  }

  /**
   * Echo back a response to say hello.
   *
   * Purpose of this endpoint is to echo back what was received, this merely
   * validated that the server is up and running.
   * @param options The options parameters.
   */
  extEchoGet(
    options?: EchoExtEchoGetOptionalParams
  ): Promise<EchoExtEchoGetResponse> {
    return this.client.sendOperationRequest(
      { options },
      extEchoGetOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const extEchoGetOperationSpec: coreClient.OperationSpec = {
  path: "/ext/echo",
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
