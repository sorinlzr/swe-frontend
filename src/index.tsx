import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import logo from './logo.png';
import styled from 'styled-components';
import App from './routes/App';
import ErrorPage from './routes/error-page';
import SignInRegister from './containers/SignInRegister';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: radial-gradient(#ffcece, #d0d3fa);
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  // width: 200px; /* Adjust the width as needed */
  margin-bottom: 20px; /* Add space between the logo and SignInRegister */
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <SignInRegister tab='login' />
  },
  {
    path: "/register",
    element: <SignInRegister tab='register' />
  },
]);

root.render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <React.StrictMode>
    <AppContainer>
      <CenteredContainer>
      <Logo src={logo} className="App-logo" alt="logo" />
      <RouterProvider router={router} />
      </CenteredContainer>
    </AppContainer>
    </React.StrictMode>
  </CookiesProvider>
);
