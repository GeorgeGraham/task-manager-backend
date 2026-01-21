
export class Task{
    id : string;
    title : string;
    author_id : string;
    complete : boolean;
    list_order : number;
    constructor(id : string, title :string , author_id : string, complete : boolean, list_order : number){
        this.id = id;
        this.title = title;
        this.author_id = author_id;
        this.complete = complete;
        this.list_order = list_order;
    }
}