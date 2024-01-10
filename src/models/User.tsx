export interface User {
    userid: string;
    firstname: string;
    lastname: string;
    username: string;
    email?: string;
    avatar?: string;
    followedUsers?: [];
    favorites?: [];
}