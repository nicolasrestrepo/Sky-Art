import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './config/web3'
import { CssBaseline } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ToastContainer 
       position="bottom-center"
       autoClose={7000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
    />
    <Web3ReactProvider getLibrary={getLibrary}>
     <App />
    </Web3ReactProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
