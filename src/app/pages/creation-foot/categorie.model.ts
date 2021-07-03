import { Champ } from "./champ.model";

export class Categorie {
    _id:String;
    idTypePari:String;
    nomcategorie : String;
    Champ:Champ[];
    nomType;
    token;
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

/*export class CategorieForm {
    _id:String;
    idTypePari:String;
    nomcategorie : String;
    champ:Champ[];
}*/