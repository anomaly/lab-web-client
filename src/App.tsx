import React from 'react';
import { LabsApiClient } from 'api/otc';
// TODO: see if we can import this as a module
import { LabsApi } from 'api/ar/src';

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
    <div className="App">
      <h1 className="text-3xl font-bold">Anomaly Labs</h1>
      <button onClick={otcCallMe}>OTC Client</button>
      <button onClick={arCallme}>AR Client</button>
    </div>
  );
}

export default App;
