import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import logo from './logo.png';
import styled from 'styled-components';
import './App.css';
import SignInRegister from './containers/SignInRegister';
import Homepage from './containers/Homepage';
import { User } from './models/User';


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

function App() {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [cookies] = useCookies(['swe-backend-cookie']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(cookies['swe-backend-cookie'] ? true : false);
  }, [cookies]);

  return (
    <AppContainer>
      <CenteredContainer>
        <Logo src={logo} className="App-logo" alt="logo" />
        {isLoggedIn ? (
          <Homepage currentUser={currentUser} />
        ) : (
          <SignInRegister setCurrentUser={setCurrentUser} />
        )}
      </CenteredContainer>
    </AppContainer>
  );
}

export default App;
