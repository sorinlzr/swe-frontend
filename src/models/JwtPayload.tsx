export interface JwtPayload {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    exp: number,
    iat: number
}