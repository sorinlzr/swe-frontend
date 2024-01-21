import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Favorite } from "../../models/Favorite";
import "./FavoriteComponent.css";

interface FavoriteComponentProps {
    favorite: Favorite;
    textOrientation: string;
    displayText?: boolean;
    isFollowingView?: boolean;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.grey[200],
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
        fontSize: 15,
    },
}));

const favoriteTypeMessages: { [key: string]: string } = {
    Artist: "Listening to",
    Song: "Playing on repeat",
    Movie: "Watching",
    Book: "Reading",
};

function FavoriteComponent({
    favorite,
    textOrientation,
    displayText = true,
    isFollowingView = false,
}: FavoriteComponentProps) {
    return (
        <div className={setOrientation(textOrientation)}>
            {displayText ? (
                <>{getFavoriteMessage(favorite.type.name, isFollowingView)} </>
            ) : null}
            {favorite.coverArtUrl ? (
                <LightTooltip
                    disableFocusListener
                    disableTouchListener
                    placement={textOrientation === "left" ? "left" : "bottom"}
                    title={favorite.name}
                >
                    <img
                        className="favorite-image"
                        src={favorite.coverArtUrl}
                        alt={favorite.name}
                    />
                </LightTooltip>
            ) : (
                <>{favorite.name}</>
            )}
        </div>
    );
}

function setOrientation(textOrientation: string) {
    switch (textOrientation) {
        case "top":
            return "favorite-grid-vertical";
        case "left":
            return "favorite-grid-horizontal";
        default:
            return "favorite-grid-vertical";
    }
}

function getFavoriteMessage(favoriteType: string, isFollowingView: boolean) {
    const message = favoriteTypeMessages[favoriteType];
    const className = isFollowingView
        ? "favorite-description-text following-view-text"
        : "favorite-description-text";
    return message ? <p className={className}>{message}</p> : null;
}

export default FavoriteComponent;
