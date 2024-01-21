import { Favorite } from "./Favorite";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email?: string;
    avatar?: string;
    followedUsers?: string[];
    favorites?: Favorite[];
}
