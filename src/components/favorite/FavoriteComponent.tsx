import { Favorite } from "../../models/Favorite";
import "./FavoriteComponent.css";

interface FavoriteComponentProps {
  favorite: Favorite;
  textOrientation: string;
}

function FavoriteComponent({
  favorite,
  textOrientation,
}: FavoriteComponentProps) {
  return (
    <div className={setOrientation(textOrientation)}>
      {getFavoriteMessage(favorite.type.name)}
      <img
        className="favorite-image"
        src={favorite.coverArtUrl}
        alt={favorite.name}
      />
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

function getFavoriteMessage(favoriteType: string) {
  switch (favoriteType) {
    case "Artist":
      return <p className="favorite-description-text">Listening to</p>;
    case "Song":
      return <p className="favorite-description-text">Playing on repeat</p>;
    case "Movie":
      return <p className="favorite-description-text">Watching</p>;
    case "Book":
      return <p className="favorite-description-text">Reading</p>;
    default:
      return null;
  }
}

export default FavoriteComponent;
