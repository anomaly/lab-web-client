import {
    Link,
    Form
} from 'react-router-dom';

import {
    QueryClient,
} from 'react-query';

import {
    UserResponse,
} from 'api/models';

import {
    useGetUsersWithLimits,
    getGetUsersWithLimitsQueryKey,
} from 'api/user/user';

/**
 * Loader that the router uses to get content, this
 * returns an async function that it can use.
 * 
 * react-query takes the key as an array, which would
 * represent the collection as well as individual items.
 * 
 * getGetUsersWithLimitsQueryKey is generated by orval
 * which provides a construct similar to what's reference
 * in the documentation.
 * 
 * const contactListQuery = (q) => ({
*    queryKey: ["contacts", "list", q ?? "all"],
*    queryFn: () => getContacts(q),
*  })
 * 
 * 
 * @param queryClient 
 * @returns function that returns a promise
 */
export const loader = 
    (queryClient: QueryClient) => 
    async() => {
    return(
        queryClient.getQueriesData(getGetUsersWithLimitsQueryKey()) ?? 
        (await queryClient.fetchQuery(getGetUsersWithLimitsQueryKey({
            offset:0,
            limit:100
        })))
    );
}

function AdminContainer() {

    const { 
        data: users,
        refetch 
    } = useGetUsersWithLimits();

    return(
        <div className="">
            <h1>Users</h1>
            <ul>
            {users?.data.map((user: UserResponse) => (
            <li key={user.id}>
                <div>{user.firstName} {user.lastName}</div>
                <Link to={`${user.id}/edit`}>Edit</Link>
                <Form
                method="post"
                action={`${user.id}/destroy`}
                onSubmit={(event) => {
                  // eslint-disable-next-line no-restricted-globals
                  if (!confirm("Please confirm you want to delete this record.")) {
                    event.preventDefault();
                  }
                }}>
                  <button type="submit">Delete</button>
                </Form>
            </li>
            ))}
            </ul>
            <Link to="/admin/users/new">New User</Link>
            <Link to="/auth/login">Login</Link>
        </div>
    );
}

export default AdminContainer;