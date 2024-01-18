import "./PublicProfileView.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../models/User";
import { useCookies } from "react-cookie";
import UserAvatar from "./UserAvatar";
import ErrorPage from "../../routes/error-page";
import UserProfile from "./UserProfile";

export default function PublicProfileView() {
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [cookies] = useCookies(["swe-backend-cookie"]);
    const [fetchError, setFetchError] = useState(false);
    const { username } = useParams();

    const getUser = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users/${username}`
            );
            setCurrentUser(data.user);
        } catch (err: any) {
            setFetchError(true);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {fetchError ? (
                <ErrorPage />
            ) : currentUser ? (
                <>
                    <UserProfile user={currentUser} />
                </>
            ) : null}
        </>
    );
}
