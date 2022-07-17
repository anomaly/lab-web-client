import {
  WriteToLoggerExtLogGetOptionalParams,
  WriteToLoggerExtLogGetResponse
} from "../models";

/** Interface representing a Write. */
export interface Write {
  /**
   * Log a message.
   *
   * Purpose of this endpoint is to log a message to the logger.
   * @param options The options parameters.
   */
  toLoggerExtLogGet(
    options?: WriteToLoggerExtLogGetOptionalParams
  ): Promise<WriteToLoggerExtLogGetResponse>;
}
