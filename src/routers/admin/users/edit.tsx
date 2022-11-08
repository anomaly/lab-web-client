import { redirect, Form, useParams } from 'react-router-dom';
import {
    QueryClient,
} from 'react-query';

import {
    useGetUserById,
    getGetUserByIdQueryKey,
    updateUser
} from 'api/user/user';
import { UserRequest } from 'api/models';

export const loader = 
    (queryClient: QueryClient) => 
    async({ request, params } : any) => {
    const query = getGetUserByIdQueryKey(params.id);
    return (queryClient.getQueriesData(query) ??
    (await queryClient.fetchQuery(query)));
};

export const action = (queryClient: QueryClient) =>
    async({ request, params } : any) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateUser(params.id, updates as UserRequest);
    return redirect('../');
};

function UserEditor() {

    const { id } :any = useParams();

    // Made available by orval
    const { data: user } = useGetUserById(id);

    return(
        <div>
            <Form method="post" id="update-user">
                <span>First name</span>
                <input
                placeholder="First"
                aria-label="First name"
                type="text"
                name="firstName"
                defaultValue={user?.data.firstName}
                />
                <span>Last name</span>
                <input
                placeholder="Last"
                aria-label="Last name"
                type="text"
                name="lastName"
                defaultValue={user?.data.lastName}
                />
                <span>Email</span>
                <input
                placeholder="Email"
                aria-label="Email"
                type="email"
                name="email"
                defaultValue={user?.data.email}
                />
                <span>Mobile Number</span>
                <input
                placeholder="Mobile"
                aria-label="Mobile"
                type="phone"
                name="mobileNumber"
                defaultValue={user?.data.mobileNumber}
                />

                <button type="submit">Save</button>
            </Form>
        </div>
    );
}

export default UserEditor;