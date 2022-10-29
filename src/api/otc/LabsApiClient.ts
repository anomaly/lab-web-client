/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AuthService } from './services/AuthService';
import { DefaultService } from './services/DefaultService';
import { ExtService } from './services/ExtService';
import { OtpService } from './services/OtpService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class LabsApiClient {

    public readonly auth: AuthService;
    public readonly default: DefaultService;
    public readonly ext: ExtService;
    public readonly otp: OtpService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '/api',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.auth = new AuthService(this.request);
        this.default = new DefaultService(this.request);
        this.ext = new ExtService(this.request);
        this.otp = new OtpService(this.request);
    }
}

