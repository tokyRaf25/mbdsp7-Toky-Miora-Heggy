import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParisportService } from './parisport.service';
import { Parisport , ParisportModele } from './parisport';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from './categorie.service';
import { Categorie } from './categorie.model';
import { Champ } from './champ.model';
import { ResultatsPredictService } from './resultats-predict.service';
import { ClientService } from './client.service';
import { ResultatsPredict } from './resultats-predict.model';
import { Client } from './client.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  pari_sport:Parisport[];
  pariSport: Parisport;
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
  panier:Champ[] = [];
  misetotal:number = 0;
  gainpotentieltotal:number = 0;
  message:String;
  temp:Champ[] = [];
  user:Client;
  color:String;
  constructor(
	private pariSportService: ParisportService,
  private categorieService: CategorieService,
  private route: ActivatedRoute,
  private resultatpreditService:ResultatsPredictService,
  private clientservice : ClientService,
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
      if(localStorage.getItem("panier")){
        this.panier = JSON.parse(localStorage.getItem("panier"));
        for(let i =0;i<this.panier.length;i++){
           this.pariSportService.getParisSportById(this.panier[i].cote[0].idParieSport).subscribe(data=>{
              this.pariSport = data;
              this.panier[i].detail = this.pariSport.equipes;
              console.log("Equipe :"+this.panier[i].detail[0].nomEquipe)
          });
        }
        
      }
    });
  }
	
  getPariSport() {
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
      console.log(data);
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
    this.router.navigate(['/pages/dashboard'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
   
    this.router.navigate(['/pages/dashboard'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/pages/dashboard'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/pages/dashboard'], {
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
        this.router.navigate(['/pages/tables/basic-tables'],{replaceUrl:true});
      });
    } 
  }

  remove(arg:String){
    for(let i = 0;i<this.panier.length;i++){
     if(this.panier[i]._id == arg && i!=0){
       console.log("Indice:"+i)
       this.panier.splice(i,1);
       console.log("Reste élément:"+this.panier)
       localStorage.setItem("panier",JSON.stringify(this.panier));
       break;
     }
     if(this.panier[i]._id == arg && i==0){
       console.log("Indice:"+i)
       this.panier.shift();
       console.log("Reste élément:"+this.panier)
       localStorage.setItem("panier",JSON.stringify(this.panier));
       break;
     }
   }
   this.temp = JSON.parse(localStorage.getItem("panier"));
   this.misetotal = 0;
   this.gainpotentieltotal = 0;
   for(let i = 0; i<this.temp.length;i++){
       this.misetotal +=Number(this.temp[i].valeur);
       this.gainpotentieltotal += Number(this.temp[i].valeur) * Number(this.temp[i].cote[0].cotes);
   }
 }

 parier(){
  this.user = JSON.parse(localStorage.getItem("currentClients"));
  if(this.misetotal <= Number( this.user.jetons) && this.misetotal!=0 ){
    this.panier = JSON.parse(localStorage.getItem("panier"));
    for(let i =0;i<this.panier.length;i++){
      var rp =  new ResultatsPredict();
      rp.idChamp = this.panier[i]._id;
      rp.cotes = this.panier[i].cote[0].cotes;
      rp.gain = Number(this.panier[i].cote[0].cotes) * Number(this.panier[i].valeur);
      rp.idPariSport = this.panier[i].cote[0].idParieSport;
      rp.mise = Number(this.panier[i].valeur);
      rp.status = 0;
      rp.dateDePari = Date.now().toString();
      rp.idClient = this.user.id;
      this.resultatpreditService.addParie(rp).subscribe(data=>{
        console.log(data);
      });
    }
    var client =  new Client();
    client.name = this.user.name;
    client.id = this.user.id;
    client.password = this.user.password;
    client.jetons = Number(this.user.jetons) - Number(this.misetotal);
    client.email = this.user.email;
    this.user.jetons =  client.jetons;
    localStorage.setItem("currentClients",JSON.stringify(this.user));
    this.clientservice.updateClient(client).subscribe(data=>{
       localStorage.removeItem("panier");
       this.panier = [];
       this.color = "green";
       this.message="Panier valider";
       this.misetotal = 0;
       this.gainpotentieltotal = 0;
    });
  }
  else{
    this.color = "red";
    this.message="Votre solde est insuffisant";
  }
}

 onChange(arg:Champ){
  for(let i = 0;i<this.panier.length;i++){
    if(this.panier[i]._id == arg._id){
      this.panier[i].valeur = arg.valeur;
      break;
    }
  }
  localStorage.setItem("panier",JSON.stringify(this.panier));
  this.temp = JSON.parse(localStorage.getItem("panier"));
  this.misetotal = 0;
  this.gainpotentieltotal = 0;
  for(let i = 0; i<this.temp.length;i++){
    if(this.temp[i].valeur!=undefined){
      this.misetotal +=Number(this.temp[i].valeur);
      this.gainpotentieltotal += Number(this.temp[i].valeur) * Number(this.temp[i].cote[0].cotes);
    }
  }
}
  
}
