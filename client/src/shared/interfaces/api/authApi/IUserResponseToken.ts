export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IUserResponseToken {
    data: ITokens;
}
