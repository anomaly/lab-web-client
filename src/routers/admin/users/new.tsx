import { redirect, Form, useParams } from 'react-router-dom';
import {
    QueryClient,
} from 'react-query';

import {
    createUser
} from 'api/user/user';
import { UserRequest } from 'api/models';

export const action = (queryClient: QueryClient) =>
    async({ request } : any) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await createUser(updates as UserRequest);
    return redirect('../');
};

function UserCreator() {

    return(
        <div>
            <Form method="post" id="update-user">
                <span>First name</span>
                <input
                placeholder="First"
                aria-label="First name"
                type="text"
                name="firstName"
                />
                <span>Last name</span>
                <input
                placeholder="Last"
                aria-label="Last name"
                type="text"
                name="lastName"
                />
                <span>Email</span>
                <input
                placeholder="Email"
                aria-label="Email"
                type="email"
                name="email"
                />
                <span>Mobile Number</span>
                <input
                placeholder="Mobile"
                aria-label="Mobile"
                type="phone"
                name="mobileNumber"
                />

                <button type="submit">Save</button>
            </Form>
        </div>
    );
}

export default UserCreator;