import React from 'react';
import { 
  Link as RouterLink 
} from 'react-router-dom';
import { 
  Helmet 
} from 'react-helmet';

import AnomalyLogo from 'assets/icon-anomaly.png';

function App() {

  return (
    <div className="flex flex-col justify-center w-screen h-screen p-20 font-bold text-black app">
      <Helmet>
        <title>Welcome to labs</title>
        <meta name="description" content="Welcome to labs" />
      </Helmet>
      <img
        src={AnomalyLogo}
        alt="Anomaly Logo"
        width={40}
        height={40}/>
      <h1 className="my-4 text-3xl font-bold">Anomaly Labs</h1>
      <nav>
        <ul className="flex flex-col">
          <li className="text-blue-700 underline">
            <RouterLink to="/auth/otp">
              Sign in with One Time Password
            </RouterLink>
          </li>
          <li className="text-blue-700 underline">
            <RouterLink to="/auth/login">
              Sign in with Email &amp; Password
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
