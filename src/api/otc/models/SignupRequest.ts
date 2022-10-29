/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Pydantic base model for applications
 *
 * This class is used to define the base model for all schema
 * that we use in the Application, it configures pydantic to
 * translate between camcelCase and snake_case for the JSON
 * amongst other default settings.
 */
export type SignupRequest = {
    password: string;
    email: string;
};

