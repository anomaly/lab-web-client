/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Verify User Account
     * Verify an account
     *
     * @returns any Successful Response
     * @throws ApiError
     */
    public static verifyUserAccountAuthVerifyGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/verify',
        });
    }

    /**
     * Get Me
     * Get the currently logged in user or myself
     *
     * This endpoint will return the currently logged in user or raise
     * and exception if the user is not logged in.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getMeAuthMeGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/me',
        });
    }

    /**
     * Login User
     * Login a user.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static loginUserAuthLoginPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
        });
    }

    /**
     * Logout User
     * @returns any Successful Response
     * @throws ApiError
     */
    public static logoutUserAuthLogoutPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }

    /**
     * Signup User
     * @returns any Successful Response
     * @throws ApiError
     */
    public static signupUserAuthSignupPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
        });
    }

    /**
     * Login
     * @returns any Successful Response
     * @throws ApiError
     */
    public static loginAuthAccountPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/account',
        });
    }

}
