import React from "react";
import { useCookies } from "react-cookie";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import Logo from "../components/logo/Logo";
import UserAvatar from "../components/user/UserAvatar";
import { Tooltip } from "@mui/material";

interface HomepageProps {
    currentUser: User;
}

const Homepage = (props: HomepageProps) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        "swe-backend-cookie",
    ]);
    const { currentUser } = props;

    const navigate = useNavigate();

    const handleLogout = async (event: React.MouseEvent) => {
        await axios.post(
            `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/logout`
        );
        removeCookie("swe-backend-cookie");
        navigate("/login");
    };

    return (
        <>
            <Logo height={"100px"} />
            <div
                className="clickable"
                onClick={() => {
                    navigate("/global");
                }}
            >
                <Tooltip placement={"top"} title="Explore">
                    <h1>Welcome to Buzz!</h1>
                </Tooltip>
            </div>
            <UserAvatar
                user={currentUser}
                isHorizontal={false}
                hideName={true}
                size="large"
            />
            <h2>{"Hello, " + currentUser?.firstname}</h2>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    width: "auto",
                    fontFamily: "Contrail One, sans-serif",
                    backgroundColor: "#ffffff1a",
                    "&:hover": {
                        backgroundColor: "#F4BA11",
                    },
                }}
                onClick={handleLogout}
            >
                Sign Out
            </Button>
        </>
    );
};

export default Homepage;
