
export class Task{
    id : string;
    title : string;
    userId : string;
    done : boolean;
    constructor(id : string, title :string , userId : string, done : boolean){
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.done = done;
    }
}