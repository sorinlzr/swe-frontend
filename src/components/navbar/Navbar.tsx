import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [cookies, setCookie, removeCookie] = useCookies([
        "swe-backend-cookie",
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(cookies["swe-backend-cookie"] ? true : false);
    }, [cookies]);

    const handleLogout = async (event: React.MouseEvent) => {
        removeCookie("swe-backend-cookie");

        await axios.post(
            `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/logout`
        );
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Menu
                    </Typography>
                    {isLoggedIn ? (
                        <Button color="inherit" onClick={handleLogout} href="/">
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" href="/">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
