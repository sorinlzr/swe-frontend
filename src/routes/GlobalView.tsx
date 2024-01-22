import "./GlobalView.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { JwtPayload } from "../models/JwtPayload";
import { jwtDecode } from "jwt-decode";
import { User } from "../models/User";
import ErrorPage from "./error-page";
import FavoriteContainer from "../containers/FavoriteContainer";

export default function GlobalView() {
    const [users, setUsers] = useState<User[] | undefined>([]);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState<
        User | undefined
    >();
    const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>([]);
    const [fetchError, setFetchError] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>("");

    const [cookies, setCookie] = useCookies(["swe-backend-cookie"]);

    function shuffle(array: any[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
    
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
    
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

    useEffect(() => {
        let decoded: JwtPayload;
        if (cookies["swe-backend-cookie"]) {
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
                    return;
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        }
    }, [cookies]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users`
            )
            .then((response) => {
                setUsers(response.data.data);
                setFilteredUsers(shuffle(
                    response.data.data.filter(
                        (user: User) =>
                            user.favorites && user.favorites.length > 0
                    ) || []
                ));
            })
            .catch((error) => {
                console.error("Error fetching followed users:", error);
                setFetchError(true);
            });
        handleCategoryChange("");
    }, []);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category === "") {
            setFilteredUsers(
                users?.filter(
                    (user) => user.favorites && user.favorites.length > 0
                ) || []
            );
        } else {
            const temp = users?.filter((user) =>
                user.favorites?.some(
                    (favorite) => favorite.type.name === category
                )
            );
            setFilteredUsers(temp);
        }
    };

    return (
        <>
            {fetchError ? (
                <ErrorPage />
            ) : filteredUsers ? (
                <>
                    <div className="header">
                        <p>What's everyone buzzing about?</p>
                    </div>
                    <div className="category-dropdown">
                        <p>Category:</p>
                        <select
                            value={selectedCategory || ""}
                            onLoad={() => handleCategoryChange}
                            onChange={(e) =>
                                handleCategoryChange(e.target.value)
                            }
                        >
                            <option value="">All</option>
                            <option value="Book">Book</option>
                            <option value="Movie">Movie</option>
                            <option value="Song">Song</option>
                            <option value="Artist">Artist</option>
                        </select>
                    </div>
                    <>
                        {filteredUsers && filteredUsers.length > 0
                            ? filteredUsers?.map((user) => (
                                  <FavoriteContainer
                                      key={user.id}
                                      renderedUser={user}
                                      showAllFavorites={false}
                                      category={selectedCategory}
                                      currentLoggedInUser={currentLoggedInUser}
                                  />
                              ))
                            : null}
                    </>
                    {selectedCategory && filteredUsers?.length === 0 && (
                        <p className="header">
                            Looks like no one has a favorite of this category.
                        </p>
                    )}
                </>
            ) : null}
        </>
    );
}
