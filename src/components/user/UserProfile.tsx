import AddIcon from "@mui/icons-material/Add";
import { User } from "../../models/User";
import { Favorite } from "../../models/Favorite";
import UserAvatar from "./UserAvatar";
import { useEffect, useState } from "react";
import { JwtPayload } from "../../models/JwtPayload";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import FavoriteComponent from "../favorite/FavoriteComponent";

interface UserProfileProps {
  user?: User;
}

export default function UserProfile(props: UserProfileProps) {
  const [cookies] = useCookies(["swe-backend-cookie"]);
  const { user } = props;
  const [isCurrentUserLoggedInUser, setIsCurrentUserLoggedInUser] =
    useState(false);

  useEffect(() => {
    let decoded: JwtPayload;

    if (cookies["swe-backend-cookie"]) {
      decoded = jwtDecode(cookies["swe-backend-cookie"]);
      if (decoded.id === user?.id) {
        setIsCurrentUserLoggedInUser(true);
      }
    }
  }, [cookies, user?.id]);

  const renderFavorites = () => {
    if (!user?.favorites) {
      return null;
    }

    const favoritesToRender = user.favorites.slice(0, 4);

    return (
      <>
        {favoritesToRender.map((favorite: Favorite) => (
          <div key={favorite._id} className="favorite-box">
            <FavoriteComponent textOrientation="top" favorite={favorite} />
          </div>
        ))}
        {user.id && isCurrentUserLoggedInUser ? (
          <>
            {Array.from({
              length: 4 - favoritesToRender.length,
            }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="favorite-box placeholder"
              >
                <span>Add a favorite</span>
                <AddIcon sx={{ fontSize: 60 }} />
              </div>
            ))}
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      {" "}
      {user ? (
        <>
          <UserAvatar user={user} isHorizontal={false} hideName={false} />
          <h2 className="favorites-heading">{user?.firstname}'s favorites</h2>
          <div className="favorites-grid">{renderFavorites()}</div>
        </>
      ) : null}
    </>
  );
}
