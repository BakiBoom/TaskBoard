export interface IUserPayload {
    userId: bigint;
    username: string;
    email: string;
};

export interface ITokens {
    accessToken: string;
    refreshToken: string;
};