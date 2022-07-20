import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LabsApiClient } from 'api/otc';
// TODO: see if we can import this as a module
import { LabsApi } from 'api/ar/src';
import AnomalyLogo from 'assets/icon-anomaly.png';

function App() {

  // OTC client demo
  const otcClient = new LabsApiClient();
  // Autoreset client demo
  const labsApi: LabsApi = new LabsApi();

  const otcCallMe = async () => {
    otcClient.auth.getMeAuthMeGet().then(res => { 
      console.log(res);
    }).catch(err => { 
      console.log(err);
    });
  };

  const arCallme = async () => {
    labsApi.get.meAuthMeGet().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="flex flex-col justify-center w-screen h-screen p-20 text-black app">
      <img
        src={AnomalyLogo}
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
