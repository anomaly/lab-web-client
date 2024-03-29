/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * labs-api
 * 
This project provides a reference Python API built using FastAPI, the 
aim of the project is:

- To maintain a good know source of habits
- Demonstrate how applications are meant to be put together at Anomaly
- Democratize design of robust API


 * OpenAPI spec version: 0.1.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import {
  useQuery,
  useMutation
} from 'react-query'
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from 'react-query'
import type {
  HTTPValidationError,
  SignupRequest,
  OTPTriggerResponse,
  OTPTriggerEmailRequest,
  OTPTriggerSMSRequest,
  OTPVerifyRequest,
  Token,
  BodyLoginForAuthTokenTokenPost,
  UserResponse
} from '.././models'


/**
 * @summary Signup User
 */
export const signupUser = (
    signupRequest: SignupRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.post(
      `/signup`,
      signupRequest,options
    );
  }



export const getSignupUserMutationOptions = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof signupUser>>, TError,{data: SignupRequest}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof signupUser>>, TError,{data: SignupRequest}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof signupUser>>, {data: SignupRequest}> = (props) => {
          const {data} = props ?? {};

          return  signupUser(data,axiosOptions)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type SignupUserMutationResult = NonNullable<Awaited<ReturnType<typeof signupUser>>>
    export type SignupUserMutationBody = SignupRequest
    export type SignupUserMutationError = AxiosError<HTTPValidationError>

    export const useSignupUser = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof signupUser>>, TError,{data: SignupRequest}, TContext>, axios?: AxiosRequestConfig}
) => {
    
      const mutationOptions = getSignupUserMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    /**
 * Verify an account
 * @summary Verify User
 */
export const verifyUser = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/verify`,options
    );
  }


export const getVerifyUserQueryKey = () => [`/verify`] as const;
  

    
export const getVerifyUserQueryOptions = <TData = Awaited<ReturnType<typeof verifyUser>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof verifyUser>>, TError, TData>, axios?: AxiosRequestConfig}
): UseQueryOptions<Awaited<ReturnType<typeof verifyUser>>, TError, TData> & { queryKey: QueryKey } => {
const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getVerifyUserQueryKey();

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof verifyUser>>> = ({ signal }) => verifyUser({ signal, ...axiosOptions });
    
      
      
   return  { queryKey, queryFn, ...queryOptions}}

export type VerifyUserQueryResult = NonNullable<Awaited<ReturnType<typeof verifyUser>>>
export type VerifyUserQueryError = AxiosError<unknown>

export const useVerifyUser = <TData = Awaited<ReturnType<typeof verifyUser>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof verifyUser>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getVerifyUserQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Attempt to authenticate a user and issue JWT token

The user has provided us their email address and we will
attempt to authenticate them via OTP.
 * @summary Initiate Otp Email
 */
export const initiateOtpEmail = (
    oTPTriggerEmailRequest: OTPTriggerEmailRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<OTPTriggerResponse>> => {
    return axios.post(
      `/otp/initiate/email`,
      oTPTriggerEmailRequest,options
    );
  }



export const getInitiateOtpEmailMutationOptions = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof initiateOtpEmail>>, TError,{data: OTPTriggerEmailRequest}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof initiateOtpEmail>>, TError,{data: OTPTriggerEmailRequest}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof initiateOtpEmail>>, {data: OTPTriggerEmailRequest}> = (props) => {
          const {data} = props ?? {};

          return  initiateOtpEmail(data,axiosOptions)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type InitiateOtpEmailMutationResult = NonNullable<Awaited<ReturnType<typeof initiateOtpEmail>>>
    export type InitiateOtpEmailMutationBody = OTPTriggerEmailRequest
    export type InitiateOtpEmailMutationError = AxiosError<HTTPValidationError>

    export const useInitiateOtpEmail = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof initiateOtpEmail>>, TError,{data: OTPTriggerEmailRequest}, TContext>, axios?: AxiosRequestConfig}
) => {
    
      const mutationOptions = getInitiateOtpEmailMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    /**
 * Attempt to authenticate a user and issue JWT token

The user has provided a mobile number and we will text them
their OTP and let them login.
 * @summary Initiate Otp Sms
 */
export const initiateOtpSms = (
    oTPTriggerSMSRequest: OTPTriggerSMSRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<OTPTriggerResponse>> => {
    return axios.post(
      `/otp/initiate/sms`,
      oTPTriggerSMSRequest,options
    );
  }



export const getInitiateOtpSmsMutationOptions = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof initiateOtpSms>>, TError,{data: OTPTriggerSMSRequest}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof initiateOtpSms>>, TError,{data: OTPTriggerSMSRequest}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof initiateOtpSms>>, {data: OTPTriggerSMSRequest}> = (props) => {
          const {data} = props ?? {};

          return  initiateOtpSms(data,axiosOptions)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type InitiateOtpSmsMutationResult = NonNullable<Awaited<ReturnType<typeof initiateOtpSms>>>
    export type InitiateOtpSmsMutationBody = OTPTriggerSMSRequest
    export type InitiateOtpSmsMutationError = AxiosError<HTTPValidationError>

    export const useInitiateOtpSms = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof initiateOtpSms>>, TError,{data: OTPTriggerSMSRequest}, TContext>, axios?: AxiosRequestConfig}
) => {
    
      const mutationOptions = getInitiateOtpSmsMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    /**
 * Attempt to authenticate a user and issue JWT token
 * @summary Verify Otp
 */
export const verifyOtp = (
    oTPVerifyRequest: OTPVerifyRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.post(
      `/otp/verify`,
      oTPVerifyRequest,options
    );
  }



export const getVerifyOtpMutationOptions = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof verifyOtp>>, TError,{data: OTPVerifyRequest}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof verifyOtp>>, TError,{data: OTPVerifyRequest}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof verifyOtp>>, {data: OTPVerifyRequest}> = (props) => {
          const {data} = props ?? {};

          return  verifyOtp(data,axiosOptions)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type VerifyOtpMutationResult = NonNullable<Awaited<ReturnType<typeof verifyOtp>>>
    export type VerifyOtpMutationBody = OTPVerifyRequest
    export type VerifyOtpMutationError = AxiosError<HTTPValidationError>

    export const useVerifyOtp = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof verifyOtp>>, TError,{data: OTPVerifyRequest}, TContext>, axios?: AxiosRequestConfig}
) => {
    
      const mutationOptions = getVerifyOtpMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    /**
 * Attempt to authenticate a user and issue JWT token
 * @summary Provides an endpoint for login via email and password
 */
export const loginForAuthToken = (
    bodyLoginForAuthTokenTokenPost: BodyLoginForAuthTokenTokenPost, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Token>> => {const formUrlEncoded = new URLSearchParams();
if(bodyLoginForAuthTokenTokenPost.grant_type !== undefined) {
 formUrlEncoded.append('grant_type', bodyLoginForAuthTokenTokenPost.grant_type)
 }
formUrlEncoded.append('username', bodyLoginForAuthTokenTokenPost.username)
formUrlEncoded.append('password', bodyLoginForAuthTokenTokenPost.password)
if(bodyLoginForAuthTokenTokenPost.scope !== undefined) {
 formUrlEncoded.append('scope', bodyLoginForAuthTokenTokenPost.scope)
 }
if(bodyLoginForAuthTokenTokenPost.client_id !== undefined) {
 formUrlEncoded.append('client_id', bodyLoginForAuthTokenTokenPost.client_id)
 }
if(bodyLoginForAuthTokenTokenPost.client_secret !== undefined) {
 formUrlEncoded.append('client_secret', bodyLoginForAuthTokenTokenPost.client_secret)
 }

    return axios.post(
      `/token`,
      formUrlEncoded,options
    );
  }



export const getLoginForAuthTokenMutationOptions = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof loginForAuthToken>>, TError,{data: BodyLoginForAuthTokenTokenPost}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof loginForAuthToken>>, TError,{data: BodyLoginForAuthTokenTokenPost}, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof loginForAuthToken>>, {data: BodyLoginForAuthTokenTokenPost}> = (props) => {
          const {data} = props ?? {};

          return  loginForAuthToken(data,axiosOptions)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type LoginForAuthTokenMutationResult = NonNullable<Awaited<ReturnType<typeof loginForAuthToken>>>
    export type LoginForAuthTokenMutationBody = BodyLoginForAuthTokenTokenPost
    export type LoginForAuthTokenMutationError = AxiosError<HTTPValidationError>

    export const useLoginForAuthToken = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof loginForAuthToken>>, TError,{data: BodyLoginForAuthTokenTokenPost}, TContext>, axios?: AxiosRequestConfig}
) => {
    
      const mutationOptions = getLoginForAuthTokenMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    /**
 * Provides a refresh token for the JWT session.
 * @summary  Provides an endpoint for refreshing the JWT token
 */
export const refreshJwtToken = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Token>> => {
    return axios.post(
      `/refresh`,undefined,options
    );
  }



export const getRefreshJwtTokenMutationOptions = <TError = AxiosError<unknown>,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof refreshJwtToken>>, TError,TVariables, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof refreshJwtToken>>, TError,TVariables, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof refreshJwtToken>>, TVariables> = () => {
          

          return  refreshJwtToken(axiosOptions)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type RefreshJwtTokenMutationResult = NonNullable<Awaited<ReturnType<typeof refreshJwtToken>>>
    
    export type RefreshJwtTokenMutationError = AxiosError<unknown>

    export const useRefreshJwtToken = <TError = AxiosError<unknown>,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof refreshJwtToken>>, TError,TVariables, TContext>, axios?: AxiosRequestConfig}
) => {
    
      const mutationOptions = getRefreshJwtTokenMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    /**
 * Ends a users session
 * @summary  Provides an endpoint for logging out the user
 */
export const logoutUser = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.post(
      `/logout`,undefined,options
    );
  }



export const getLogoutUserMutationOptions = <TError = AxiosError<unknown>,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof logoutUser>>, TError,TVariables, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof logoutUser>>, TError,TVariables, TContext> => {
 const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof logoutUser>>, TVariables> = () => {
          

          return  logoutUser(axiosOptions)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type LogoutUserMutationResult = NonNullable<Awaited<ReturnType<typeof logoutUser>>>
    
    export type LogoutUserMutationError = AxiosError<unknown>

    export const useLogoutUser = <TError = AxiosError<unknown>,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof logoutUser>>, TError,TVariables, TContext>, axios?: AxiosRequestConfig}
) => {
    
      const mutationOptions = getLogoutUserMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    /**
 * Get the currently logged in user or myself

This endpoint will return the currently logged in user or raise
and exception if the user is not logged in.
 * @summary Get Me
 */
export const getMe = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UserResponse>> => {
    return axios.get(
      `/me`,options
    );
  }


export const getGetMeQueryKey = () => [`/me`] as const;
  

    
export const getGetMeQueryOptions = <TData = Awaited<ReturnType<typeof getMe>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>, axios?: AxiosRequestConfig}
): UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData> & { queryKey: QueryKey } => {
const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMeQueryKey();

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMe>>> = ({ signal }) => getMe({ signal, ...axiosOptions });
    
      
      
   return  { queryKey, queryFn, ...queryOptions}}

export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>
export type GetMeQueryError = AxiosError<unknown>

export const useGetMe = <TData = Awaited<ReturnType<typeof getMe>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetMeQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
}

