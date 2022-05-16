import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App';
import UserInfoContext from './UserInfoContext';
ReactDOM.render(
    <UserInfoContext>
        <CssBaseline />
        <App />
    </UserInfoContext>,
    document.querySelector('#root'),
);