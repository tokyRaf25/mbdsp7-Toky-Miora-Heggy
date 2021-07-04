import { Categorie} from "./categorie.model";
export interface Equipe { 
    nomEquipe : String ;
}
export class Parisport {
    _id:String;
    idTypePari: String;
    dateDuMatch : Date;
    autres_info: String;
    status: String;
    equipes:Equipe[]; 
    total:Number;
    Categorie:Categorie[];
}

export class ParisportModele {
	
    docs : Parisport[];
    hasPrevPage:boolean;
    hasNextPage:boolean;
    prevPage:Number;
    nextPage:Number;
    page:Number;
    totalDocs:Number;
    totalPages:Number;
    limit:Number;
	
}


