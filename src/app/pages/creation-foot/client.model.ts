export class Client {
    _id:String;
    name: String;
    email: String;
    jetons: Number;
    password: String;
}
export class ClientModele {
	
    docs : Client[];
    hasPrevPage:boolean;
    hasNextPage:boolean;
    prevPage:Number;
    nextPage:Number;
    page:Number;
    totalDocs:Number;
    totalPages:Number;
    limit:Number;
	
}