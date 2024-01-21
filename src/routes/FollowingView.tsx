import "./FollowingView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../models/User";
import { useCookies } from "react-cookie";
import ErrorPage from "./error-page";
import FavoriteContainer from "../containers/FavoriteContainer";
import { JwtPayload } from "../models/JwtPayload";
import { jwtDecode } from "jwt-decode";

export default function FollowingView() {
    const [followedUsers, setFollowedUsers] = useState<User[]>([]);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState<
        User | undefined
    >();
    const [cookies] = useCookies(["swe-backend-cookie"]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        setIsLoggedIn(cookies["swe-backend-cookie"] ? true : false);
        if (cookies["swe-backend-cookie"]) {
            let decoded: JwtPayload;
            decoded = jwtDecode(cookies["swe-backend-cookie"]);

            axios
                .get(
                    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users/${decoded.username}`,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    setCurrentLoggedInUser(response.data.user);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });

            axios
                .get(
                    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users/follow`,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    if (response.status === 204) {
                        return;
                    } else if (response.data.data.length) {
                        setFollowedUsers(response.data.data);
                    }
                    return;
                })
                .catch((error) => {
                    console.error("Error fetching followed users:", error);
                    setFetchError(true);
                });
        }
    }, [cookies]);

    return (
        <>
            {fetchError ? (
                <ErrorPage />
            ) : isLoggedIn && followedUsers ? (
                <>
                    <div className="header">
                        <p>What's happening in my hive?</p>
                    </div>

                    {followedUsers.length ? (
                        followedUsers.map((user) => {
                            return user.favorites &&
                                user.favorites.length > 0 ? (
                                <FavoriteContainer
                                    key={user.id}
                                    renderedUser={user}
                                    showAllFavorites={true}
                                    isFollowingView={true}
                                    currentLoggedInUser={currentLoggedInUser}
                                />
                            ) : null;
                        })
                    ) : (
                        <>
                            <p className="empty-list">Kinda empty here.. Try following more bees</p>
                        </>
                    )}
                </>
            ) : null}
        </>
    );
}
