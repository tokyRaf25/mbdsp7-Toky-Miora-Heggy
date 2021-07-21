import { Cote } from "./cote.model";
import { Equipe } from "./parisport";
export class Champ {
    _id:String;
    idCategorie: String;
    nomChamp: String;
    valeur:String;
    nomCategorie:String;
    cote:Cote[];
    detail:Equipe[];
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