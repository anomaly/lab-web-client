import { Write } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { LabsApi } from "../labsApi";
import {
  WriteToLoggerExtLogGetOptionalParams,
  WriteToLoggerExtLogGetResponse
} from "../models";

/** Class containing Write operations. */
export class WriteImpl implements Write {
  private readonly client: LabsApi;

  /**
   * Initialize a new instance of the class Write class.
   * @param client Reference to the service client
   */
  constructor(client: LabsApi) {
    this.client = client;
  }

  /**
   * Log a message.
   *
   * Purpose of this endpoint is to log a message to the logger.
   * @param options The options parameters.
   */
  toLoggerExtLogGet(
    options?: WriteToLoggerExtLogGetOptionalParams
  ): Promise<WriteToLoggerExtLogGetResponse> {
    return this.client.sendOperationRequest(
      { options },
      toLoggerExtLogGetOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const toLoggerExtLogGetOperationSpec: coreClient.OperationSpec = {
  path: "/ext/log",
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
