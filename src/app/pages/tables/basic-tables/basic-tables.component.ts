import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParisportService } from './../../creation-foot/parisport.service';
import { Parisport , ParisportModele } from './../../creation-foot/parisport';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from './../../creation-foot/categorie.service';
import { Categorie } from './../../creation-foot/categorie.model';
import { Type } from './../../creation-foot/type';
import { TypeService } from './../../creation-foot/type.service';

@Component({
  selector: 'app-basic-tables',
  templateUrl: './basic-tables.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BasicTablesComponent implements OnInit {

  pari_sport:Parisport[];
  categorie:Categorie[];
  page: Number=1;
  limit: Number=10;
  totalDocs: Number;
  totalPages: Number;
  hasPrevPage: boolean;
  prevPage: Number;
  hasNextPage: boolean;
  nextPage: Number;
  showMsg: boolean = false;
  showMsgUpdate: boolean = false;
  pariUpdated:Parisport;
  type:Type[];
  equipeA:String;
  equipeB:String;
  date:String;
  time:String;
  typeParie:string = "";
  idParis:String;
  constructor(
	private pariSportService: ParisportService,
  private categorieService: CategorieService,
  private route: ActivatedRoute,
  private typeService: TypeService,
  private router: Router
  ) {  
    this.page = this.route.snapshot.params.page;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 2;

      this.getPariSport();
      this.getCategorie();
    });
    //console.log(this.pari_sport);
  }
	
  getPariSport() {
    console.log("this.page",this.page);
    this.pariSportService.getPariSportPagine(this.page, this.limit).subscribe(data=>{
      this.pari_sport = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      //console.log(data);
      this.typeService.getAllTypePari().subscribe(data=>{
        this.type = data.docs;
            this.pari_sport.forEach(pari_sport=>{
              this.type.forEach(type=>{
                    if(pari_sport.idTypePari == type._id){
                      pari_sport.type = type.typeParie;
                    }
              });
         });
    });
    });
  }

  getCategorie(){
    this.categorieService.getAllCategoriePagine(this.page, this.limit).subscribe(data=>{
      this.categorie = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log(data);
    });
  }

  premierePage() {
    this.router.navigate(['/pages/tables/basic-tables'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
   
    this.router.navigate(['/pages/tables/basic-tables'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/pages/tables/basic-tables'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/pages/tables/basic-tables'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

  deletePari(parisport:Parisport){

    if(confirm("Etes vous sur de vouloir supprimer ")) {
      this.pariSportService.deletePariSport(parisport._id).subscribe(data=>{
        this.getPariSport();
        this.showMsg= true;
        console.log(data);
        this.router.navigate(['/pages/tables/basic-tables'],{replaceUrl:true});
      });
    } 
  }

 
  getInfo(paris:Parisport){
    this.pariUpdated = paris;
    this.equipeA = this.pariUpdated.equipes[0].nomEquipe;
    this.equipeB = this.pariUpdated.equipes[1].nomEquipe;
    this.date = this.pariUpdated.dateDuMatch.split(' ')[0];
    this.time = this.pariUpdated.dateDuMatch.split(' ')[1];
    this.idParis = this.pariUpdated._id;
  }
  getType(){
    this.typeService.getAllTypePari().subscribe(data=>{
      this.type = data.docs;
      console.log(data.docs);
    });
  }
  get gettypeParie() {
    return this.typeParie;
  }
  set setCategorieSelect(value) {
    this.categorie = value;
  }

  update(){
    if(this.typeParie && this.equipeA && this.equipeB && this.date && this.time){
      console.log(this.equipeA +"et"+ this.equipeB );
      var paris =  new Parisport();
      paris.dateDuMatch = ""+this.date+" "+this.time+"";
      paris.equipes = [{nomEquipe:this.equipeA},{nomEquipe:this.equipeB}];
      paris.idTypePari = this.typeParie;
      paris._id = this.idParis;
      paris.token = localStorage.getItem("token");
      this.pariSportService.updateParis(paris).subscribe(data=>{
        this.getPariSport();
        this.showMsgUpdate = true;
        this.showMsg = false;
        this.router.navigate(['/pages/tables/basic-tables'],{replaceUrl:true});
      });
    }
  }
  
}
