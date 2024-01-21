import React, { useEffect, useState } from "react";
import "./FavoriteContainer.css";
import FavoriteComponent from "../components/favorite/FavoriteComponent";
import UserAvatar from "../components/user/UserAvatar";
import { Favorite } from "../models/Favorite";
import { User } from "../models/User";
import IconButton from "@mui/material/IconButton";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PersonAddDisabledRoundedIcon from "@mui/icons-material/PersonAddDisabledRounded";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

interface FavoriteContainerProps {
    renderedUser: User;
    currentLoggedInUser?: User;
    showAllFavorites: boolean;
    isFollowingView?: boolean;
    category?: string | null;
}

const FavoriteContainer: React.FC<FavoriteContainerProps> = ({
    renderedUser,
    currentLoggedInUser,
    showAllFavorites,
    isFollowingView = false,
    category = "Movie",
}) => {
    const [isFollowing, setIsFollowing] = useState(
        currentLoggedInUser
            ? currentLoggedInUser.followedUsers?.some(
                  (user) => user === renderedUser.id
              ) || false
            : false
    );

    useEffect(() => {
        setIsFollowing(
            currentLoggedInUser
                ? currentLoggedInUser.followedUsers?.some(
                      (user) => user === renderedUser.id
                  ) || false
                : false
        );
    }, [currentLoggedInUser, renderedUser.id]);

    const handleFollowClick = () => {
        axios
            .post(
                `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users/follow/${renderedUser.id}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    withCredentials: true,
                }
            )
            .then(() => {
                setIsFollowing(true);
            })
            .catch((error) => {
                console.error("Error following user:", error);
            });
    };

    const handleUnfollowClick = async () => {
        try {
            await axios.delete(
                `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users/follow/${renderedUser.id}`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    withCredentials: true,
                }
            );
            setIsFollowing(false);
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    let favoriteToDisplay: Favorite | undefined;

    if (category) {
        favoriteToDisplay = renderedUser.favorites?.find(
            (fav) => fav.type.name === category
        );
    } else {
        favoriteToDisplay = renderedUser.favorites
            ? renderedUser.favorites[
                  Math.floor(Math.random() * renderedUser.favorites.length)
              ]
            : undefined;
    }

    return (
        <div className="favorite-container">
            <div className="user-avatar">
                <UserAvatar
                    user={renderedUser}
                    isHorizontal={false}
                    hideName={false}
                    size={"medium"}
                />
            </div>
            {currentLoggedInUser &&
            currentLoggedInUser.id !== renderedUser.id ? (
                <div className="follow-container">
                    {isFollowing ? (
                        <IconButton
                            className="unfollow-button"
                            onClick={handleUnfollowClick}
                        >
                            <Tooltip title="Unfollow">
                                <PersonAddDisabledRoundedIcon />
                            </Tooltip>
                        </IconButton>
                    ) : (
                        <IconButton
                            className="follow-button"
                            onClick={handleFollowClick}
                        >
                            <Tooltip title="Follow">
                                <PersonAddRoundedIcon />
                            </Tooltip>
                        </IconButton>
                    )}
                </div>
            ) : null}

            <div className="content">
                {showAllFavorites
                    ? renderedUser.favorites?.map((fav) => (
                          <FavoriteComponent
                              key={fav._id}
                              textOrientation="top"
                              favorite={fav}
                              displayText={true}
                              isFollowingView={isFollowingView}
                          />
                      ))
                    : favoriteToDisplay && (
                          <FavoriteComponent
                              textOrientation="left"
                              favorite={favoriteToDisplay}
                              displayText={true}
                          />
                      )}
            </div>
        </div>
    );
};

export default FavoriteContainer;
