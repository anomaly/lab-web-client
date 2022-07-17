import {
  EchoExtEchoGetOptionalParams,
  EchoExtEchoGetResponse
} from "../models";

/** Interface representing a Echo. */
export interface Echo {
  /**
   * Echo back a response to say hello.
   *
   * Purpose of this endpoint is to echo back what was received, this merely
   * validated that the server is up and running.
   * @param options The options parameters.
   */
  extEchoGet(
    options?: EchoExtEchoGetOptionalParams
  ): Promise<EchoExtEchoGetResponse>;
}
