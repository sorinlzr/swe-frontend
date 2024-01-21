import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { User } from "../../models/User";
import { Favorite } from "../../models/Favorite";
import UserAvatar from "./UserAvatar";
import { JwtPayload } from "../../models/JwtPayload";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import FavoriteComponent from "../favorite/FavoriteComponent";

import axios from "axios";

interface UserProfileProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export default function UserProfile(props: UserProfileProps) {
  const [cookies] = useCookies(["swe-backend-cookie"]);
  const [user, setUser] = useState<User>(props.user);
  const [isCurrentUserLoggedInUser, setIsCurrentUserLoggedInUser] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [coverArtUrl, setCoverArtUrl] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    let decoded: JwtPayload;

    if (cookies["swe-backend-cookie"]) {
      decoded = jwtDecode(cookies["swe-backend-cookie"]);
      if (decoded.id === user?.id) {
        setIsCurrentUserLoggedInUser(true);
      }
    }
  }, [cookies, user?.id]);


  useEffect(() => {
    axios
      .get(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/categories`
      )
      .then((response) => {
        const categoryNames = response.data.data.map(
          (category: { name: string }) => category.name
        );
        setCategories(categoryNames);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName("");
    setSelectedType("");
    setCoverArtUrl("");
    setSearchText("");
  };

  const handleSaveFavorite = () => {
    axios
      .post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/favorites/`,
        {
          type: selectedType,
          name: name,
          coverArtUrl: coverArtUrl,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Favorite saved successfully:", response.data);
        const newFavorite = {
          _id: response.data.data.id,
          name: response.data.data.name,
          type: { name: response.data.data.type },
          coverArtUrl: response.data.data.coverArtUrl,
        };
        const updatedUser = { ...user };
        updatedUser.favorites = updatedUser.favorites
          ? [...updatedUser.favorites, newFavorite]
          : [newFavorite];
        setUser(updatedUser);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error saving favorite:", error);
      });
  };

  const getSpotifyResults = (searchText: string, category: string) => {
    axios
      .get(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/spotify/` +
          category,
        {
          params: {
            searchText: searchText,
          },
        }
      )
      .then((response) => {
        const listOfSearchElements = document.getElementById(
          "listOfSearchElements"
        );
        if (listOfSearchElements) {
          listOfSearchElements.innerHTML = "";
          response.data.forEach((element: any) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = element.name;
            listItem.addEventListener("click", () => {
              let selectedElement = document.querySelector(".selectedItem");
              selectedElement?.classList.remove("selectedItem");
              console.log("clicked on:", element);
              listItem.classList.add("selectedItem");
              setName(element.name);
              setCoverArtUrl(element.image);
              //handleCloseModal();
            });
            listOfSearchElements.appendChild(listItem);
          });
        }
      })
      .catch((error) => {
        console.error("Error saving favorite:", error);
      });
  };

  const handleDeleteFavorite = (favoriteId: string) => {
    axios
      .delete(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/favorites/${favoriteId}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        const updatedUser = { ...user };
        updatedUser.favorites = updatedUser.favorites?.filter(
          (fav) => fav._id !== favoriteId
        );
        setUser(updatedUser);
      })
      .catch((error) => {
        console.error("Error deleting favorite:", error);
      });
  };

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
            {user.id && isCurrentUserLoggedInUser ? (
              <>
                <IconButton
                  className="delete-icon"
                  onClick={() => handleDeleteFavorite(favorite._id)}
                >
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </>
            ) : null}
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
                onClick={handleOpenModal}
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
      {user ? (
        <>
          <UserAvatar user={user} isHorizontal={false} hideName={false} />
          <h2 className="favorites-heading">{user?.firstname}'s favorites</h2>
          <div className="favorites-grid">{renderFavorites()}</div>

          <Dialog open={isModalOpen} onClose={handleCloseModal}>
            <DialogTitle>Add a Favorite</DialogTitle>
            <DialogContent>
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as string)}
                fullWidth
                label="Favorite Type"
              >
                {categories
                  .filter(
                    (category) =>
                      !user?.favorites?.some(
                        (fav) => fav.type.name === category
                      )
                  )
                  .map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
              </Select>
              {(selectedType === "Book" || selectedType === "Movie") && (
                <>
                  <TextField
                    label="Favorite Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Cover Art URL"
                    value={coverArtUrl}
                    onChange={(e) => setCoverArtUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </>
              )}
              {(selectedType === "Artist" || selectedType === "Song") && (
                <>
                  <TextField
                    label="Searchtext"
                    value={searchText}
                    onChange={(e) => {
                      getSpotifyResults(
                        e.target.value,
                        selectedType === "Artist" ? "artists" : "songs"
                      );
                      setSearchText(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <ul id="listOfSearchElements"></ul>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button
                onClick={handleSaveFavorite}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
