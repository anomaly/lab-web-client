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
  useQuery
} from 'react-query'
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey
} from 'react-query'
import type {
  HealthCheckResponse
} from '.././models'


/**
 * Echo back a response to say hello.

Purpose of this endpoint is to echo back what was received, this merely
validated that the server is up and running.
 * @summary Echo
 */
export const echo = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/ext/echo`,options
    );
  }


export const getEchoQueryKey = () => [`/ext/echo`] as const;
  

    
export const getEchoQueryOptions = <TData = Awaited<ReturnType<typeof echo>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof echo>>, TError, TData>, axios?: AxiosRequestConfig}
): UseQueryOptions<Awaited<ReturnType<typeof echo>>, TError, TData> & { queryKey: QueryKey } => {
const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getEchoQueryKey();

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof echo>>> = ({ signal }) => echo({ signal, ...axiosOptions });
    
      
      
   return  { queryKey, queryFn, ...queryOptions}}

export type EchoQueryResult = NonNullable<Awaited<ReturnType<typeof echo>>>
export type EchoQueryError = AxiosError<unknown>

export const useEcho = <TData = Awaited<ReturnType<typeof echo>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof echo>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getEchoQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Check the health of the server.

Purpose of this endpoint is to check the health of the server.
We check for connection to the database, queue and logger
 * @summary Get Health
 */
export const getHealth = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<HealthCheckResponse>> => {
    return axios.get(
      `/ext/healthcheck`,options
    );
  }


export const getGetHealthQueryKey = () => [`/ext/healthcheck`] as const;
  

    
export const getGetHealthQueryOptions = <TData = Awaited<ReturnType<typeof getHealth>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getHealth>>, TError, TData>, axios?: AxiosRequestConfig}
): UseQueryOptions<Awaited<ReturnType<typeof getHealth>>, TError, TData> & { queryKey: QueryKey } => {
const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetHealthQueryKey();

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof getHealth>>> = ({ signal }) => getHealth({ signal, ...axiosOptions });
    
      
      
   return  { queryKey, queryFn, ...queryOptions}}

export type GetHealthQueryResult = NonNullable<Awaited<ReturnType<typeof getHealth>>>
export type GetHealthQueryError = AxiosError<unknown>

export const useGetHealth = <TData = Awaited<ReturnType<typeof getHealth>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getHealth>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetHealthQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Log a message.

Purpose of this endpoint is to log a message to the logger.
 * @summary Test Logger
 */
export const testLogger = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/ext/log`,options
    );
  }


export const getTestLoggerQueryKey = () => [`/ext/log`] as const;
  

    
export const getTestLoggerQueryOptions = <TData = Awaited<ReturnType<typeof testLogger>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof testLogger>>, TError, TData>, axios?: AxiosRequestConfig}
): UseQueryOptions<Awaited<ReturnType<typeof testLogger>>, TError, TData> & { queryKey: QueryKey } => {
const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTestLoggerQueryKey();

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof testLogger>>> = ({ signal }) => testLogger({ signal, ...axiosOptions });
    
      
      
   return  { queryKey, queryFn, ...queryOptions}}

export type TestLoggerQueryResult = NonNullable<Awaited<ReturnType<typeof testLogger>>>
export type TestLoggerQueryError = AxiosError<unknown>

export const useTestLogger = <TData = Awaited<ReturnType<typeof testLogger>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof testLogger>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getTestLoggerQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
}

