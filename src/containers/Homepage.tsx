import React from 'react';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import axios from 'axios';
import { User } from '../models/User';
import { useNavigate } from 'react-router-dom';

interface HomepageProps {
  currentUser: User;
}

const Homepage = (props: HomepageProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['swe-backend-cookie']);
  const { currentUser } = props
  
  const navigate = useNavigate();

  const handleLogout = async ( event: React.MouseEvent ) => {
    await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/logout`); 
    removeCookie('swe-backend-cookie')
    navigate("/login");
  }
  
  return (
    <>
      <div>
        <h1>Welcome to Buzz!</h1>
      </div>
      <h2>{"Hello, " + currentUser.firstname}</h2>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogout}
      >
        Sign Out
      </Button>
    </>
  );
};

export default Homepage;
