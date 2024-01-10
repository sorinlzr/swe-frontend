import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import SignInRegister from '../containers/SignInRegister';
import Homepage from '../containers/Homepage';
import { User } from '../models/User';
import { JwtPayload } from '../models/JwtPayload';
import { jwtDecode } from "jwt-decode";

function App() {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [cookies] = useCookies(['swe-backend-cookie']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(cookies['swe-backend-cookie'] ? true : false);
    let decoded: JwtPayload;

    if (cookies['swe-backend-cookie']) {
      decoded = jwtDecode(cookies['swe-backend-cookie']);
      setCurrentUser({
        firstname: decoded.firstname,
        lastname: decoded.lastname,
        username: decoded.username,
        id: decoded.id
      });
    }

  }, [cookies]);

  return (
    <>
      {isLoggedIn ? (
        <Homepage currentUser={currentUser} />
      ) : (
        <SignInRegister tab='login' />
      )}
    </>
  );
}

export default App;
