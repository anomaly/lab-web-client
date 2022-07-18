import {
    Outlet
} from "react-router-dom";
import { 
    LoginIcon, 
    MailIcon 
} from '@heroicons/react/outline'

import Login from "./Login";

function Authentication() {
    return(
        <div>
            <header className="flex items-center justify-between p-4">
                <h1>Wattle</h1>
                <ul  className="flex">
                    <li className="p-4 ml-4 border-2 border-blue-100 rounded-full shadow-md">
                        <LoginIcon className="w-6 h-6 text-blue-500"/>
                    </li>
                    <li className="p-4 ml-4 border-2 border-blue-100 rounded-full shadow-md">
                        <MailIcon className="w-6 h-6 text-blue-500"/>
                    </li>
                </ul>
            </header>
            <Outlet />
        </div>
    );
}

export default Authentication;