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

import './index.css';
import './i18n';

import App from './App';
import Authentication from './views/Authentication';
import Login from './views/Authentication/Login';
import OTP from './views/Authentication/OTP';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "otp",
        element: <OTP/>
      }
    ]
  }
]);

/**
 * 
 */
const queryClient = new QueryClient();

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
