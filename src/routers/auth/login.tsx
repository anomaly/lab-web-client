import { redirect, Form } from 'react-router-dom';
import {
    QueryClient,
} from 'react-query';

import { 
    loginForAuthToken, useLoginForAuthToken,
} from 'api/auth/auth';
import { Helmet } from 'react-helmet';

export const action = (queryClient: QueryClient) => 
async({ request } : any) => {
    const formData = await request.formData();
    const loginInfo = Object.fromEntries(formData);
    await loginForAuthToken({
        username: loginInfo.username,
        password: loginInfo.password,
    }).then((response) => {
        queryClient.setQueryData('access_token', response.data?.access_token);
    }).catch((error) => {
        console.log(error);
    });
    return redirect('/admin/users');
};

function Login() {

    return(
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Form method="post" id="login-user">
                <span>Username</span>
                <input
                placeholder="user@domain.com"
                aria-label="Username"
                type="text"
                name="username"
                />
                <span>Password</span>
                <input
                type="password"
                placeholder=""
                aria-label="Password"
                name="password"
                />
                <button type="submit">Save</button>
            </Form>
        </div>
    );
}

export default Login;