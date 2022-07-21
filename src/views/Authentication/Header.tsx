import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AnomalyLogo from 'assets/icon-anomaly.png';

function Header() {
    return(
    <header className="flex justify-between min-w-full p-6 text-gray-700">
      <img
        src={AnomalyLogo}
        width={40}
        height={40}/>
      <nav className="">
        <ul className="flex">
          <li className="ml-2 text-blue-700 underline">
            <RouterLink to="/auth/otp">
              Password Login
            </RouterLink>
          </li>
          <li className="ml-2 text-blue-700 underline">
            <RouterLink to="/">
              Home
            </RouterLink>
          </li>
        </ul>        
      </nav>
        
    </header>);
}

export default Header;