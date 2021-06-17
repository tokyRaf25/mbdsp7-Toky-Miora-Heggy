export class Champ {
    _id:String;
    idCategorie: String;
    nomChamp: String
}
export class ChampModele {
	
    docs : Champ[];
    hasPrevPage:boolean;
    hasNextPage:boolean;
    prevPage:Number;
    nextPage:Number;
    page:Number;
    totalDocs:Number;
    totalPages:Number;
    limit:Number;
	
}