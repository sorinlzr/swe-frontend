import React from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import Button from '@mui/material/Button';
import axios from 'axios';
import { User } from '../models/User';
import { JwtPayload } from '../models/JwtPayload';

interface HomepageProps {
  currentUser: User;
}

const Homepage = (props: HomepageProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['swe-backend-cookie']);
  let decoded: JwtPayload;
  let name = '';

  if (cookies['swe-backend-cookie']) {
    decoded = jwtDecode(cookies['swe-backend-cookie']);
    name = decoded.firstname
  }
  

  return (
    <>
      <div>
        <h1>Welcome to Buzz!</h1>
      </div>
      <h2>{"Hello, " + name}</h2>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={async () => {
          await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/logout`); 
          removeCookie('swe-backend-cookie')
        }}
      >
        Sign Out
      </Button>
    </>
  );
};

export default Homepage;
