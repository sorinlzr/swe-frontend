import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListItemText from "@mui/material/ListItemText";
import { useCookies } from "react-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { User } from "../../models/User";
import { JwtPayload } from "../../models/JwtPayload";
import UserAvatar from "../user/UserAvatar";
import { ListItemButton } from "@mui/material";

export default function Navbar() {
    const [cookies, setCookie, removeCookie] = useCookies([
        "swe-backend-cookie",
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsLoggedIn(cookies["swe-backend-cookie"] ? true : false);
        let decoded: JwtPayload;

        if (cookies["swe-backend-cookie"]) {
            decoded = jwtDecode(cookies["swe-backend-cookie"]);
            setCurrentUser({
                firstname: decoded.firstname,
                lastname: decoded.lastname,
                username: decoded.username,
                avatar: decoded.avatar,
                id: decoded.id,
            });
        }
    }, [cookies]);

    const handleLogout = async (event: React.MouseEvent) => {
        removeCookie("swe-backend-cookie");

        await axios.post(
            `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/logout`
        );
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Box sx={{ pt: 9 }}>
            <AppBar position="fixed" sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenuToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, fontFamily: 'Contrail One, sans-serif' }}
                    >
                        Menu
                    </Typography>
                    {isLoggedIn ? (
                        <>
                            <UserAvatar
                                user={currentUser}
                                size="small"
                            />
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                sx={{
                                    fontFamily: 'Contrail One, sans-serif',
                                    '&:hover': {
                                        backgroundColor: '#F4BA11',
                                    },
                                }}
                                href="/"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit"
                        sx={{
                            fontFamily: 'Contrail One, sans-serif',
                            '&:hover': {
                                backgroundColor: '#F4BA11',
                            },
                        }} 
                        href="/">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isMenuOpen} onClose={handleMenuToggle}>
                <List>
                    {isLoggedIn ? (
                        <>
                            <ListItemButton href="/">
                                <HomeOutlinedIcon
                                    sx={{ marginRight: "10px" }}
                                />
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </>
                    ) : (
                        <ListItemButton href="/">
                            <LoginOutlinedIcon sx={{ marginRight: "10px" }} />
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    )}
                    <ListItemButton href="/global">
                        <PublicOutlinedIcon sx={{ marginRight: "10px" }} />
                        <ListItemText primary="Global View" />
                    </ListItemButton>
                    {isLoggedIn ? (
                        <>
                            <ListItemButton href="/following">
                                <FavoriteBorderOutlinedIcon
                                    sx={{ marginRight: "10px" }}
                                />
                                <ListItemText primary="Following" />
                            </ListItemButton>
                            <ListItemButton  href={`/user/${currentUser.username}`}>
                                <AccountCircleOutlinedIcon
                                    sx={{ marginRight: "10px" }}
                                />
                                <ListItemText primary="My Profile" />
                            </ListItemButton>
                            <ListItemButton onClick={handleLogout} href="/">
                                <LogoutOutlinedIcon
                                    sx={{ marginRight: "10px" }}
                                />
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </>
                    ) : null}
                </List>
            </Drawer>
        </Box>
    );
}
