/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OTPTriggerEmailRequest } from '../models/OTPTriggerEmailRequest';
import type { OTPTriggerResponse } from '../models/OTPTriggerResponse';
import type { OTPTriggerSMSRequest } from '../models/OTPTriggerSMSRequest';
import type { OTPVerifyRequest } from '../models/OTPVerifyRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class OtpService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Initiate Otp Email
     * Attempt to authenticate a user and issue JWT token
     *
     * The user has provided us their email address and we will
     * attempt to authenticate them via OTP.
     * @param requestBody
     * @returns OTPTriggerResponse Successful Response
     * @throws ApiError
     */
    public initiateOtpEmail(
        requestBody: OTPTriggerEmailRequest,
    ): CancelablePromise<OTPTriggerResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/otp/initiate/email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Initiate Otp Sms
     * Attempt to authenticate a user and issue JWT token
     *
     * The user has provided a mobile number and we will text them
     * their OTP and let them login.
     * @param requestBody
     * @returns OTPTriggerResponse Successful Response
     * @throws ApiError
     */
    public initiateOtpSms(
        requestBody: OTPTriggerSMSRequest,
    ): CancelablePromise<OTPTriggerResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/otp/initiate/sms',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Verify Otp
     * Attempt to authenticate a user and issue JWT token
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public verifyOtp(
        requestBody: OTPVerifyRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/otp/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
