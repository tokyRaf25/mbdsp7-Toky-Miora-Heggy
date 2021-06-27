import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParisportService } from './parisport.service';
import { Parisport } from './parisport';
import { CategorieService } from './categorie.service';
import { Categorie,CategorieModele } from './categorie.model';
import { CoteService } from './cote.service';
import { Cote } from './cote.model';
import { TypeService } from './../creation-foot/type.service';
import { Type } from './../creation-foot/type';
import { ActivatedRoute, Router } from '@angular/router';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs-compat';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FootComponent implements OnInit {
  pariSport: Parisport = new Parisport();
  categorie:Categorie[];
  equipeA:string ='' ;
  equipeB:string ='';
  date = new Date() ;
  time:string ;
  showMsg: boolean = false;
  champId:string;
  champValue:string;
  categorieform:Categorie[];
  pari:Parisport[];
  cote:Cote;
  type:Type[];
  typeParie:string;
  constructor(
	private pariSportService: ParisportService,
  private categorieService: CategorieService,
  private coteService: CoteService,
  private typeService: TypeService,
  private route: ActivatedRoute,
  private router: Router
  ) { }

  ngOnInit() {
    this.getType();
    //this.createForm();
  }

  AddMatch() {
    if(this.equipeA && this.equipeB && this.date && this.time){
      /*var d = new Date(this.date);
      d.setHours(Number(this.time.split(":")[0])+2);
      d.setMinutes(Number(this.time.split(":")[1])+2);*/
     
		  this.pariSport.equipes = [{nomEquipe:this.equipeA},{nomEquipe:this.equipeB}];
		  this.pariSport.idTypePari = this.typeParie ;
		  this.pariSport.dateDuMatch = ""+this.date+" "+this.time+""; 
		  this.pariSport.autres_info = "";
		 
		  this.pariSportService.addAssignment(this.pariSport).subscribe(message => {
        this.showMsg= true;
        this.pariSportService.getParisLastInsert().subscribe(data => {
          this.showMsg= true;
          this.pari = data.docs;
            this.categorieform.forEach(element => {
              element.Champ.forEach(result=>{
                this.cote = new Cote();
                this.cote.idChamp = result._id;
                this.cote.idParieSport = this.pari[0]._id;
                this.cote.cotes = Number(result.valeur);
                if(this.cote.cotes){
                  this.coteService.addCote(this.cote).subscribe(message=>{
                        console.log("Ato");
                  });
                }
              });
            });
        });
			 
		  });   
	  }
  }
  getType(){
    this.typeService.getAllTypePari().subscribe(data=>{
      this.type = data.docs;
      console.log(data);
    });
  }

  get gettypeParie() {
    return this.typeParie;
  }

  set settypeParie(value) {
    this.typeParie = value;
  }

  onChange(deviceValue) {
    console.log(deviceValue);
    this.categorieService.createForm(deviceValue).subscribe(data=>{
      this.categorieform = data.docs;
      console.log(data);
      this.router.navigate(['/pages/creation-foot'],{replaceUrl:true});
    });
  }
}
