import { TokenStore } from "./tokenStore";
import { RefreshTokenData } from "./refreshTokenData";

export class MockTokenStore implements TokenStore{
    private tokens : Map<string,RefreshTokenData>;
    constructor() {
        this.tokens = new Map<string,RefreshTokenData>();
    }
    public addToken(token : string, expires : Date) : void{
        this.tokens.set(token,new RefreshTokenData(expires));
    }
    public removeToken(token : string) : void{
        this.tokens.delete(token);
    }
    public getTokenData(token : string) : RefreshTokenData | null{
        let fetchToken = this.tokens.get(token)
        if(fetchToken !=null){
            return fetchToken;
        }
        return null;
    }    
}