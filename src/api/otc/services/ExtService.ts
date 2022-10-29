/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ExtService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Echo
     * Echo back a response to say hello.
     *
     * Purpose of this endpoint is to echo back what was received, this merely
     * validated that the server is up and running.
     * @returns any Successful Response
     * @throws ApiError
     */
    public echo(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/ext/echo',
        });
    }

    /**
     * Get Health
     * Check the health of the server.
     *
     * Purpose of this endpoint is to check the health of the server.
     * We check for connection to the database, queue and logger
     * @returns any Successful Response
     * @throws ApiError
     */
    public getHealth(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/ext/healthcheck',
        });
    }

    /**
     * Test Logger
     * Log a message.
     *
     * Purpose of this endpoint is to log a message to the logger.
     * @returns any Successful Response
     * @throws ApiError
     */
    public testLogger(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/ext/log',
        });
    }

}
