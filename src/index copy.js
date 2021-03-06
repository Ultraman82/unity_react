import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';

import UserInfoContext, { UserInfoContextStore } from './UserInfoContext';

ReactDOM.render(
  <UserInfoContext>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </UserInfoContext>,
  document.querySelector('#root'),
);
