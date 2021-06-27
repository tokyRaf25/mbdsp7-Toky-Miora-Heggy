export class Type {
    _id:string;
    typeParie:string;
}
export class TypeModele {
	
    docs : Type[];
    hasPrevPage:boolean;
    hasNextPage:boolean;
    prevPage:Number;
    nextPage:Number;
    page:Number;
    totalDocs:Number;
    totalPages:Number;
    limit:Number;
	
}