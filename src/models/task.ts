
export class Task{
    id : string;
    title : string;
    author_id : string;
    complete : boolean;
    constructor(id : string, title :string , author_id : string, complete : boolean){
        this.id = id;
        this.title = title;
        this.author_id = author_id;
        this.complete = complete;
    }
}