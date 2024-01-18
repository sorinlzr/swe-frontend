export interface JwtPayload {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    avatar: string,
    exp: number,
    iat: number
}