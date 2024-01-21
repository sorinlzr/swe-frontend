import "./FollowingView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../models/User";
import { useCookies } from "react-cookie";
import ErrorPage from "./error-page";
import FavoriteContainer from "../containers/FavoriteContainer";

export default function FollowingView() {
    const [followedUsers, setFollowedUsers] = useState<User[]>([]);
    const [cookies] = useCookies(["swe-backend-cookie"]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        setIsLoggedIn(cookies["swe-backend-cookie"] ? true : false);

        if (isLoggedIn) {
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
                    console.log("getting the followed users");
                    setFollowedUsers(response.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching followed users:", error);
                    setFetchError(true);
                });
        }
    }, [cookies, isLoggedIn]);

    return (
        <>
            {fetchError ? (
                <ErrorPage />
            ) : isLoggedIn && followedUsers ? (
                <>
                    <div className="header">
                        <p>What's happening in my hive?</p>
                    </div>
                    {followedUsers.map((user) => {
                        return user.favorites && user.favorites.length > 0 ? (
                            <FavoriteContainer
                                user={user}
                                showAllFavorites={true}
                                isFollowingView={true}
                            />
                        ) : null;
                    })}
                </>
            ) : null}
        </>
    );
}
