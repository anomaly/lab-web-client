import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/solid';

function Login() {

    return(
    <div className="p-8 text-gray-700 border-2 shadow-xl border-slate-200 bg-slate-50">
        <h1 className="text-2xl font-semibold text-center">Get started</h1>
        <p className="text-center">
            We've made it easier than ever to manage your services.
        </p>
        <p className="text-center">
            Enter your mobile or email and we will send you a secure code to login.
        </p>
        <input type="tel" className="w-full px-4 py-2 my-10 text-lg font-semibold border-2 border-gray-200 rounded-md" placeholder="e.g 0499 229 339 or citizen@domain.com"></input>
        <button className="flex items-center justify-center w-full px-4 py-2 text-xl border-2 rounded-lg bg-lime-100 border-lime-300">
            <span className="mr-2">Let's go</span>
            <ArrowRightIcon height={24} width={24} />
        </button>
    </div>);
}

export default Login;