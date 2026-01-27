export class RefreshTokenData{
    public readonly expiry : Date;
    public valid : boolean;
    constructor(expiry : Date){
        this.expiry = expiry;
        //Valid By Default
        this.valid = true;
    } 
}