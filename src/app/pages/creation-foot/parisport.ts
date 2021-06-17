export interface Equipe { 
    nomEquipe : String ;
}
export class Parisport {
    _id:String;
    idTypePari: Number;
    dateDebut: Date;
    dateFin: Date;
    autres_info: String;
    status: String;
    equipes:Equipe[]; 
    total:Number;
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


