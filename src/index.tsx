import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'

import reportWebVitals from './reportWebVitals';
import Axios from 'axios';

import './index.css';
import './i18n';

import ErrorPage from 'error-page';
import App from './App';
import Authentication from './routers/auth';
import Login from './routers/auth/login';
import OTP from './routers/auth/otp';

import AdminContainer from 'routers/admin';
import UserAdminIndex, {
  loader as userLoader
} from 'routers/admin/users/index';

import UserEditor, {
  loader as userEditorLoader,
  action as userUpdateAction
} from 'routers/admin/users/edit';

import UserCreator, {
  action as userCreateAction
} from 'routers/admin/users/new';

import {
  action as destroyUserAction
} from 'routers/admin/users/destroy';

// Set a base URL
Axios.defaults.baseURL = '/api/';

/**
 * QueryClient is what react-query uses to manage the cache
 * and the state of the queries.
 * 
 * This requires to be passed to react-router loaders and
 * actions for them to work with.
 */
 const queryClient = new QueryClient();

 /**
  * Router
  */
const router = createBrowserRouter([
{
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
},
{
  path: "admin",
  element: <AdminContainer />,
  children: [
  {
    path: "users",
    loader: userLoader(queryClient),
    children: [
    {
      path: "",
      element: <UserAdminIndex />,
      index: true
    },
    {
      path: "new",
      element: <UserCreator />,
      action: userCreateAction(queryClient)
    },
    {
      path: ":id/edit",
      element: <UserEditor />,
      loader: userEditorLoader(queryClient),
      action: userUpdateAction(queryClient)
    },
    {
      path: ":id/destroy",
      element: <UserEditor />,
      action: destroyUserAction(queryClient)
    }]
  }]
}
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
