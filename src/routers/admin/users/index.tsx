import { useGetUsersWithLimits } from 'api/user/user';
import { UserResponse, UserRequest } from 'api/models';
import {
    QueryClient,
} from 'react-query';

// A loader is mounted at the router, it essentially returns
// an async method that the router can call
export const loader = 
    (queryClient: QueryClient) => 
    async() => {
    console.log(queryClient);
}

function AdminContainer() {

    const { 
        data: users,
        refetch 
    } = useGetUsersWithLimits();

    return(
        <div className="">
            <h1>Hello</h1>
            {users?.data.map((user: UserResponse) => (
                <div key={user.id}>{user.firstName} {user.lastName}</div>
            ))}
        </div>
    );
}

export default AdminContainer;