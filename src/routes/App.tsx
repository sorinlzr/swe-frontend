import "./App.css";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SignInRegister from "../containers/SignInRegister";
import Homepage from "../containers/Homepage";
import { User } from "../models/User";
import { JwtPayload } from "../models/JwtPayload";
import { jwtDecode } from "jwt-decode";
import CenteredContainer from "../containers/CenteredContainer";

function App() {
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [cookies] = useCookies(["swe-backend-cookie"]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    return (
        <div className="App">
            <CenteredContainer>
                {isLoggedIn ? (
                    <Homepage currentUser={currentUser} />
                ) : (
                    <SignInRegister tab="login" />
                )}
            </CenteredContainer>
        </div>
    );
}

export default App;
