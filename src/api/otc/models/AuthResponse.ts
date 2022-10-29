/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Response from the authentication endpoint
 *
 */
export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
};

