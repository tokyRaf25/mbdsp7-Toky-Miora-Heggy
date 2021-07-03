export interface Equipe { 
    nomEquipe : String ;
}
export class Parisport {
    _id:String;
    idTypePari: String;
    dateDuMatch: String;
    autres_info: String;
    status: String;
    equipes:Equipe[]; 
    total:Number;
    type:String;
    token:String;
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


