/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Verify User Account
     * Verify an account
     *
     * @returns any Successful Response
     * @throws ApiError
     */
    public verifyUserAccountAuthVerifyGet(): CancelablePromise<any> {
        return this.httpRequest.request({
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
    public getMeAuthMeGet(): CancelablePromise<User> {
        return this.httpRequest.request({
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
    public loginUserAuthLoginPost(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
        });
    }

    /**
     * Logout User
     * @returns any Successful Response
     * @throws ApiError
     */
    public logoutUserAuthLogoutPost(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/logout',
        });
    }

    /**
     * Signup User
     * @returns any Successful Response
     * @throws ApiError
     */
    public signupUserAuthSignupPost(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/signup',
        });
    }

    /**
     * Login
     * @returns any Successful Response
     * @throws ApiError
     */
    public loginAuthAccountPost(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/account',
        });
    }

}
