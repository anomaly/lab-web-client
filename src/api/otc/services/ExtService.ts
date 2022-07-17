/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExtService {

    /**
     * Echo
     * Echo back a response to say hello.
     *
     * Purpose of this endpoint is to echo back what was received, this merely
     * validated that the server is up and running.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static echoExtEchoGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ext/echo',
        });
    }

    /**
     * Perform Healthcheck
     * Check the health of the server.
     *
     * Purpose of this endpoint is to check the health of the server.
     * We check for connection to the database, queue and logger
     * @returns any Successful Response
     * @throws ApiError
     */
    public static performHealthcheckExtHealthcheckGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ext/healthcheck',
        });
    }

    /**
     * Write To Logger
     * Log a message.
     *
     * Purpose of this endpoint is to log a message to the logger.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static writeToLoggerExtLogGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ext/log',
        });
    }

}
