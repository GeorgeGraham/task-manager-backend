
export class Task{
    id : string;
    title : string;
    userId : string;
    constructor(id : string, title :string , userId : string){
        this.id = id;
        this.title = title;
        this.userId = userId;
    }
}