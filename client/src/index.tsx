import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import ConfigSetup from './Data/Utils/ConfigSetup';

const config = ConfigSetup.get();

ReactDOM.render(
   <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={window.location.origin}
      audience={config.audience}
      scope={config.scope}
   >
      <App />
   </Auth0Provider>,
   document.getElementById('root')
);

// Performance Measurement
reportWebVitals();
