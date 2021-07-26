export class PointDeVentes {
    _id:String;
    nomDuLieu: String;
    latitude: Number;
    longitude: Number;
}
export class PointDeVentesModele {
	
    docs : PointDeVentes[];
    hasPrevPage:boolean;
    hasNextPage:boolean;
    prevPage:Number;
    nextPage:Number;
    page:Number;
    totalDocs:Number;
    totalPages:Number;
    limit:Number;
	
}