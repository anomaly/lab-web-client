/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponse } from '../models/AuthResponse';
import type { OTPTriggerEmailRequest } from '../models/OTPTriggerEmailRequest';
import type { OTPTriggerResponse } from '../models/OTPTriggerResponse';
import type { OTPTriggerSMSRequest } from '../models/OTPTriggerSMSRequest';
import type { OTPVerifyRequest } from '../models/OTPVerifyRequest';
import type { PasswordLoginRequest } from '../models/PasswordLoginRequest';
import type { SignupRequest } from '../models/SignupRequest';
import type { UserRequest } from '../models/UserRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Signup User
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public signupUser(
        requestBody: SignupRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Verify User
     * Verify an account
     * @returns any Successful Response
     * @throws ApiError
     */
    public verifyUser(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/verify',
        });
    }

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

    /**
     *  Provides an endpoint for login via email and password
     *
     * Attempt to authenticate a user and issue JWT token
     * @param requestBody
     * @returns AuthResponse Successful Response
     * @throws ApiError
     */
    public loginUser(
        requestBody: PasswordLoginRequest,
    ): CancelablePromise<AuthResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     *  Provides an endpoint for refreshing the JWT token
     * Provides a refresh token for the JWT session.
     * @returns AuthResponse Successful Response
     * @throws ApiError
     */
    public refreshJwtToken(): CancelablePromise<AuthResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/refresh',
        });
    }

    /**
     *  Provides an endpoint for logging out the user
     * Ends a users session
     * @returns any Successful Response
     * @throws ApiError
     */
    public logoutUser(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/logout',
        });
    }

    /**
     * Get Me
     * Get the currently logged in user or myself
     *
     * This endpoint will return the currently logged in user or raise
     * and exception if the user is not logged in.
     * @returns UserRequest Successful Response
     * @throws ApiError
     */
    public getMe(): CancelablePromise<UserRequest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/me',
        });
    }

}
