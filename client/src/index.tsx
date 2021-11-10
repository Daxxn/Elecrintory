import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import authConfig from './.authConfig.json';

console.log();

ReactDOM.render(
   <Auth0Provider
      domain="dev-6ryc0ksm.us.auth0.com"
      clientId="IZSDK2YheMqHNd54wMqIVHiLw4TOYZip"
      redirectUri={window.location.origin}
      audience="https://electrintory-api.com"
      scope="read:current_user update:current_user_metadata"
   >
      {/* <Auth0Provider
      domain={authConfig.normal.domain}
      clientId={authConfig.normal.clientId}
      redirectUri={window.location.origin}
   > */}
      <App />
   </Auth0Provider>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
