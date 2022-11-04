/**
 * Generated by orval v6.10.2 🍺
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
  UserResponse,
  HTTPValidationError,
  GetUsersWithLimitsParams,
  UserRequest,
  GetUsersParams,
  DeleteUserParams
} from '.././models'


/**
 * @summary Query users between limits
 */
export const getUsersWithLimits = (
    params?: GetUsersWithLimitsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UserResponse[]>> => {
    return axios.get(
      `/users`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetUsersWithLimitsQueryKey = (params?: GetUsersWithLimitsParams,) => [`/users`, ...(params ? [params]: [])];

    
export type GetUsersWithLimitsQueryResult = NonNullable<Awaited<ReturnType<typeof getUsersWithLimits>>>
export type GetUsersWithLimitsQueryError = AxiosError<HTTPValidationError>

export const useGetUsersWithLimits = <TData = Awaited<ReturnType<typeof getUsersWithLimits>>, TError = AxiosError<HTTPValidationError>>(
 params?: GetUsersWithLimitsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUsersWithLimits>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUsersWithLimitsQueryKey(params);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersWithLimits>>> = ({ signal }) => getUsersWithLimits(params, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof getUsersWithLimits>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * Creates a new user based on
 * @summary Create a new user
 */
export const createUser = (
    userRequest: UserRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UserResponse>> => {
    return axios.post(
      `/users`,
      userRequest,options
    );
  }



    export type CreateUserMutationResult = NonNullable<Awaited<ReturnType<typeof createUser>>>
    export type CreateUserMutationBody = UserRequest
    export type CreateUserMutationError = AxiosError<HTTPValidationError>

    export const useCreateUser = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createUser>>, TError,{data: UserRequest}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createUser>>, {data: UserRequest}> = (props) => {
          const {data} = props ?? {};

          return  createUser(data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof createUser>>, TError, {data: UserRequest}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * @summary Get all users
 */
export const getUsers = (
    params?: GetUsersParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UserResponse[]>> => {
    return axios.get(
      `/users/infinite`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetUsersQueryKey = (params?: GetUsersParams,) => [`/users/infinite`, ...(params ? [params]: [])];

    
export type GetUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getUsers>>>
export type GetUsersQueryError = AxiosError<HTTPValidationError>

export const useGetUsers = <TData = Awaited<ReturnType<typeof getUsers>>, TError = AxiosError<HTTPValidationError>>(
 params?: GetUsersParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUsersQueryKey(params);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({ signal }) => getUsers(params, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof getUsers>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * Get a user by their id
 * @summary Get a particular user
 */
export const getUserById = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UserResponse>> => {
    return axios.get(
      `/users/${id}`,options
    );
  }


export const getGetUserByIdQueryKey = (id: string,) => [`/users/${id}`];

    
export type GetUserByIdQueryResult = NonNullable<Awaited<ReturnType<typeof getUserById>>>
export type GetUserByIdQueryError = AxiosError<HTTPValidationError>

export const useGetUserById = <TData = Awaited<ReturnType<typeof getUserById>>, TError = AxiosError<HTTPValidationError>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUserById>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUserByIdQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserById>>> = ({ signal }) => getUserById(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof getUserById>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * Delete a user from the database

The endpoint will look to see if the user exists, and if so
will attempt to delete the user from the database and
return a 204 response. If the user does not exist, a 404
 * @summary Delete a particular user
 */
export const deleteUser = (
    id: string,
    params?: DeleteUserParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.delete(
      `/users/${id}`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }



    export type DeleteUserMutationResult = NonNullable<Awaited<ReturnType<typeof deleteUser>>>
    
    export type DeleteUserMutationError = AxiosError<HTTPValidationError>

    export const useDeleteUser = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError,{id: string;params?: DeleteUserParams}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteUser>>, {id: string;params?: DeleteUserParams}> = (props) => {
          const {id,params} = props ?? {};

          return  deleteUser(id,params,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof deleteUser>>, TError, {id: string;params?: DeleteUserParams}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * @summary Update a particular user
 */
export const updateUser = (
    id: string,
    userRequest: UserRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UserResponse>> => {
    return axios.patch(
      `/users/${id}`,
      userRequest,options
    );
  }



    export type UpdateUserMutationResult = NonNullable<Awaited<ReturnType<typeof updateUser>>>
    export type UpdateUserMutationBody = UserRequest
    export type UpdateUserMutationError = AxiosError<HTTPValidationError>

    export const useUpdateUser = <TError = AxiosError<HTTPValidationError>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateUser>>, TError,{id: string;data: UserRequest}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateUser>>, {id: string;data: UserRequest}> = (props) => {
          const {id,data} = props ?? {};

          return  updateUser(id,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof updateUser>>, TError, {id: string;data: UserRequest}, TContext>(mutationFn, mutationOptions)
    }
    