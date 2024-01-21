import "./GlobalView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../models/User";
import ErrorPage from "./error-page";
import FavoriteContainer from "../containers/FavoriteContainer";

export default function GlobalView() {
    const [users, setUsers] = useState<User[] | undefined>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>([]);
    const [fetchError, setFetchError] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>("");

    useEffect(() => {
        axios
            .get(
                `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users`
            )
            .then((response) => {
                setUsers(response.data.data);
                setFilteredUsers(
                    response.data.data.filter(
                        (user: User) =>
                            user.favorites && user.favorites.length > 0
                    ) || []
                );
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
                                      user={user}
                                      showAllFavorites={false}
                                      category={selectedCategory}
                                  />
                              ))
                            : null}
                    </>
                    {selectedCategory && filteredUsers?.length === 0 && (
                        <p className="header">
                            Looks like no one has a favorite of any category.
                        </p>
                    )}
                </>
            ) : null}
        </>
    );
}
