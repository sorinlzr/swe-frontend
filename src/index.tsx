import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CookiesProvider>
);
