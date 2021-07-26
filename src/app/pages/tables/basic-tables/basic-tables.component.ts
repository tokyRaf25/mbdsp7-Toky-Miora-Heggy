import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParisportService } from './../../creation-foot/parisport.service';
import { Parisport , ParisportModele } from './../../creation-foot/parisport';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from './../../creation-foot/categorie.service';
import { ChampService } from './../../creation-foot/champ.service';
import { Champ } from './../../creation-foot/champ.model';
import { Categorie, CategorieModele } from './../../creation-foot/categorie.model';
import { Type } from './../../creation-foot/type';
import { TypeService } from './../../creation-foot/type.service';
import { ResultatsReelService } from './../../creation-foot/resultats-reel.service';
import { ResultatsReel } from './../../creation-foot/resultats-reel.model';
import { Cote } from 'app/pages/creation-foot/cote.model';
import { CoteService } from 'app/pages/creation-foot/cote.service';
import { ResultatsPreditService } from 'app/pages/creation-foot/resultats-predit.service';

@Component({
  selector: 'app-basic-tables',
  templateUrl: './basic-tables.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BasicTablesComponent implements OnInit {

  pari_sport:Parisport[];
  categorie:Categorie[];
  categorieReel:Categorie[];
  page: Number=1;
  limit: Number=10;
  totalDocs: Number;
  totalPages: Number;
  hasPrevPage: boolean;
  prevPage: Number;
  hasNextPage: boolean;
  nextPage: Number;
  showMsg: String;
  showMsgUpdate: String;
  pariUpdated:Parisport;
  type:Type[];
  equipeA:String;
  equipeB:String;
  date:String;
  time:String;
  typeParie:string = "";
  idParis:String;
  categorieSelected:string;
  typeSelected:string;
  champ:Champ[];
  idParieSport:String;
  champSelected:String;
  champId:String= "";
  cote:boolean;
  resultat:boolean;
  categorieCote:Categorie[];
  autres_info:String;
  select:String;
  constructor(
	private pariSportService: ParisportService,
  private categorieService: CategorieService,
  private champService: ChampService,
  private coteService: CoteService,
  private resultatreelService: ResultatsReelService,
  private resultatPreditService:ResultatsPreditService,
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
      this.limit = +queryParams.limit || 10;

      this.getPariSport();
      this.getCategorie();
    });
    //console.log(this.pari_sport);
  }
	get getcategorieSelected() {
    return this.categorieSelected;
  }

  set setcategorieSelected(value) {
    this.categorieSelected = value;
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
          this.showMsg= data.message;
          this.coteService.deleteCote(parisport._id).subscribe(message=>{
            this.resultatreelService.deleteResultatsReel(parisport._id).subscribe(rs=>{
                this.router.navigate(['/pages/tables/basic-tables'],{replaceUrl:true});
            });
          });
        });
      } 
    
  }

 
  getInfo(paris:Parisport){
    this.pariUpdated = paris;
    this.equipeA = this.pariUpdated.equipes[0].nomEquipe;
    this.equipeB = this.pariUpdated.equipes[1].nomEquipe;
    this.date = this.pariUpdated.dateDuMatch.split(' ')[0];
    this.time = this.pariUpdated.dateDuMatch.split(' ')[1];
    this.autres_info = this.pariUpdated.autres_info;
    this.idParis = this.pariUpdated._id;
    this.select = this.pariUpdated.idTypePari;
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
  set settypeParie(value) {
    this.typeParie =value;
  }
  /*set setCategorieSelect(value) {
    this.categorie = value;
  }*/

  update(){
      if(this.typeParie && this.equipeA && this.equipeB && this.date && this.time){
        console.log("Update");
        console.log(this.equipeA +"et"+ this.equipeB );
        var paris =  new Parisport();
        paris.dateDuMatch = ""+this.date+" "+this.time+"";
        paris.equipes = [{nomEquipe:this.equipeA},{nomEquipe:this.equipeB}];
        paris.idTypePari = this.typeParie;
        paris._id = this.idParis;
        paris.autres_info = this.autres_info;
        paris.token = localStorage.getItem("token");
        this.pariSportService.updateParis(paris).subscribe(data=>{
          this.getPariSport();
          this.showMsgUpdate = data.message;
          this.showMsg = null;
          this.router.navigate(['/pages/tables/basic-tables'],{replaceUrl:true});
        });
      }
    
  }
  
  getCategorieForReel(id:String){
    this.categorieService.getCategorieParType(id).subscribe(data=>{
      this.categorieReel= data.docs;
    });
  }

  insertReel(paris:Parisport){
      this.getCategorieForReel(paris.idTypePari);
      this.idParieSport = paris._id;
  }

  onChange(deviceValue) {
    if(this.resultat ){
      this.champService.getChampByCategorie(deviceValue).subscribe(data=>{
        this.champ = data;
      });
    }
    if(this.cote){
     console.log(this.idParieSport + " et "+deviceValue);
      this.categorieService.getChampEtCotePari(deviceValue,this.idParieSport).subscribe(data=>{
        console.log(data.docs);
        this.categorieCote = data.docs;
      });
    }
  }

  
  insert(){
    if(this.resultat){
      this.champ.forEach(element => {
        if(element.valeur){
          this.champId = element._id;
        }
      });
      var insert = new ResultatsReel();
      insert.idChamp = this.champId;
      insert.idPariSport = this.idParieSport;
      this.resultatreelService.addResultatsReel(insert).subscribe(data=>{
      });
    }
    if(this.cote){
      for(let i = 0;i<this.categorieCote[0].Champ.length;i++){
        if(this.categorieCote[0].Champ[i].valeur){
          var cote = new Cote();
          cote._id = this.categorieCote[0].Champ[i].cote[0]._id;
          cote.idParieSport = this.idParieSport;
          cote.idChamp = this.categorieCote[0].Champ[i]._id;
          cote.cotes = Number(this.categorieCote[0].Champ[i].valeur);
          cote.token = localStorage.getItem("token");
          this.coteService.updateCote(cote).subscribe(data=>{
            this.showMsgUpdate = null;
            this.showMsg = data.message;
          });
        }
      }
    }
  }
 
}
