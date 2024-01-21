import "./FavoriteContainer.css";
import FavoriteComponent from "../components/favorite/FavoriteComponent";
import UserAvatar from "../components/user/UserAvatar";
import { Favorite } from "../models/Favorite";
import { User } from "../models/User";

interface FavoriteContainerProps {
    user: User;
    showAllFavorites: boolean;
    isFollowingView?: boolean;
    category?: string | null;
}

const FavoriteContainer: React.FC<FavoriteContainerProps> = ({
    user,
    showAllFavorites,
    isFollowingView = false,
    category = "Movie",
}) => {
    let favoriteToDisplay: Favorite | undefined;

    if (category) {
        favoriteToDisplay = user.favorites?.filter(
            (fav) => fav.type.name === category
        )[0];
    } else {
        favoriteToDisplay = user.favorites
            ? user.favorites[Math.floor(Math.random() * user.favorites.length)]
            : undefined;
    }

    return (
        <div className="favorite-container">
            <div className="user-avatar">
                <UserAvatar
                    user={user}
                    isHorizontal={false}
                    hideName={false}
                    size={"medium"}
                />
            </div>

            <div className="content">
                {showAllFavorites
                    ? user.favorites?.map((fav) => (
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
