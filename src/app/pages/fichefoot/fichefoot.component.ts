import { Component, OnInit } from '@angular/core';
import { ParisportService } from '../dashboard/parisport.service';
import { Parisport , ParisportModele } from '../dashboard/parisport';
import { CategorieService } from '../dashboard/categorie.service';
import { Categorie } from '../dashboard/categorie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cote } from '../dashboard/cote.model';
import { Champ } from '../dashboard/champ.model';
import { ResultatsPredictService } from '../dashboard/resultats-predict.service';
import { ResultatsPredict } from '../dashboard/resultats-predict.model';
import { ClientService } from '../dashboard/client.service';
import { Client } from '../dashboard/client.model';
import { Clients } from 'src/app/clients/clients';
@Component({
  selector: 'app-foot',
  templateUrl: './fichefoot.component.html',
  styleUrls: ['./fichefoot.component.scss']
})
export class FichefootComponent implements OnInit {

  id:String;
  pariSport: Parisport[];
  panier:Champ[] = [];
  temp:Champ[] = [];
  misetotal:number = 0;
  gainpotentieltotal:number = 0;
  message:String;
  resultatPredits:Champ[];
  user:Client;
  color:String;
  pariSporttemp: Parisport;
  ngOnInit() {
    //localStorage.removeItem("panier");
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getDetailPariSport(this.id);
    if(localStorage.getItem("panier")){
      this.panier = JSON.parse(localStorage.getItem("panier"));
      for(let i =0;i<this.panier.length;i++){
         this.pariSportService.getParisSportById(this.panier[i].cote[0].idParieSport).subscribe(data=>{
            this.pariSporttemp = data;
            this.panier[i].detail = this.pariSporttemp.equipes;
            console.log("Equipe :"+this.panier[i].detail[0].nomEquipe)
        });
      }
      
    }
  }

  constructor(private pariSportService: ParisportService, private route: ActivatedRoute,
    private router: Router,private resultatpreditService:ResultatsPredictService,private clientservice : ClientService){}

  getDetailPariSport(arg:String) {
    this.pariSportService.getDetailPariSport(arg).subscribe(data=>{
      this.pariSport = data.docs;
      console.log("Ato");
      console.log(data);
    });
  }
  getPanier(arg:Champ){
    console.log("token:"+localStorage.getItem("currentClients"));
    if(localStorage.getItem("currentClients")){
          if(!localStorage.getItem("panier")){
            this.compare(arg)
            this.panier.push(arg);
            localStorage.setItem("panier",JSON.stringify(this.panier));
            console.log("Condition 1");
            console.log(this.panier);
          }
          else if(localStorage.getItem("panier")){
              this.panier = JSON.parse(localStorage.getItem("panier"));
              this.compare(arg)
              this.compareCategorie(arg)
              this.panier.push(arg);
              localStorage.setItem("panier",JSON.stringify(this.panier));
              console.log("Condition 2");
              console.log(this.panier);
            }
    }else if(!localStorage.getItem("currentClients")){
        this.router.navigate(['/login'],{replaceUrl:true});
    }
  }
  compare(arg:Champ){
        for(let i= 0;i<this.pariSport[0].Categorie.length;i++){
          if(this.pariSport[0].Categorie[i]._id == arg.idCategorie){
            arg.nomCategorie = this.pariSport[0].Categorie[i].nomcategorie;
            break;
          }
        }
  }
  compareCategorie(arg:Champ){
    for(let i=0;i<this.panier.length;i++){
      if(this.panier[i]._id == arg._id){
        this.panier.splice(i);
      }
    }
  }
  remove(arg:String){
     for(let i = 0;i<this.panier.length;i++){
      if(this.panier[i]._id == arg && i!=0){
        console.log("Indice:"+i);
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
    if(this.misetotal <= Number( this.user.jetons) && this.misetotal!=0){
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
        rp.idClient = this.user["id"];
        this.resultatpreditService.addParie(rp).subscribe(data=>{
          console.log(data);
        });
      }
      var client =  new Client();
      client.name = this.user.name;
      client._id = this.user["id"];
      client.password = this.user.password;
      client.jetons = Number(this.user.jetons) - Number(this.misetotal);
      client.email = this.user.email;
      this.user.jetons =  client.jetons;
      localStorage.setItem("currentClients",JSON.stringify(this.user));
      this.clientservice.updateJetonsClient(client).subscribe(data=>{
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
