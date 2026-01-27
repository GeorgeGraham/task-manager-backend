import { RefreshTokenData } from "./refreshTokenData";

export interface TokenStore{
    addToken(token : string, expires : Date) : void;
    removeToken(token : string) : void;
    getTokenData(token : string) : RefreshTokenData | null;
}
