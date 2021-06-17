export class Categorie {
    _id:String;
    idTypePari:String;
    nomcategorie : String;
}
export class CategorieModele {
	
    docs : Categorie[];
    hasPrevPage:boolean;
    hasNextPage:boolean;
    prevPage:Number;
    nextPage:Number;
    page:Number;
    totalDocs:Number;
    totalPages:Number;
    limit:Number;
	
}