export interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email?: string;
    avatar?: string;
    followedUsers?: [];
    favorites?: [];
}