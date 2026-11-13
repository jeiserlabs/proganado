import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProGanadoProvider } from './context/ProGanadoContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProGanadoProvider>
      <App />
    </ProGanadoProvider>
  </React.StrictMode>
);
