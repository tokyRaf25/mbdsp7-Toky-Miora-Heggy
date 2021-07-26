import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TypeService } from './../creation-foot/type.service';
import { Type } from './../creation-foot/type';
import { ChampService } from './../creation-foot/champ.service';
import { Champ } from './../creation-foot/champ.model';
import { Categorie, CategorieModele } from '../creation-foot/categorie.model';
import { CategorieService } from '../creation-foot/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tennis',
  templateUrl: './tennis.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TennisComponent implements OnInit {
  
  type:Type[];
  categorieList:Categorie[];
  typeParie:string;
  nomParis:string;
  categorie:string;
  nomchamp:string;
  nomChampMoyen:string;
  showMsg: boolean = false;
  temp:Categorie[];
  constructor(
    private typeService: TypeService,
    private categorieService: CategorieService,
    private champService: ChampService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getType();
    this.getCategorie();
  }

  getType(){
    this.typeService.getAllTypePari().subscribe(data=>{
      this.type = data.docs;
    });
  }
  getCategorie(){
    this.categorieService.getAllCategoriePagine(1,10).subscribe(data=>{
      this.categorieList = data.docs;
    });
  }

  get gettypeParie() {
    return this.typeParie;
  }

  set settypeParie(value) {
    this.typeParie = value;
  }

  get getCategorieSelect() {
    return this.categorie;
  }

  set setCategorieSelect(value) {
    this.categorie = value;
  }

  AddCategorie(){
        if(this.typeParie && this.nomParis && this.nomChampMoyen){
            var categorie = new Categorie();
            categorie.idTypePari = this.typeParie;
            categorie.nomcategorie = this.nomParis;
            categorie.token = localStorage.getItem("token");
            this.categorieService.addCategorie(categorie).subscribe(message => {
              this.categorieService.getParisLastInsert().subscribe(data=>{
                this.temp = data.docs;
                 console.log(this.temp);
                 let champ = new Champ();
                 champ.idCategorie = this.temp[0]._id;
                 champ.nomChamp = this.nomChampMoyen;
                 champ.token = localStorage.getItem("token");
                 this.champService.addChamp(champ).subscribe(message => {
                  this.showMsg= true;
                    setTimeout(()=> { 
                      window.location.reload()
                    },1000);
                  });
              });
              
            });     
        }
  }
  AddChamp(){
      if(this.categorie && this.nomchamp){
              var champ = new Champ();
              champ.idCategorie = this.categorie;
              champ.nomChamp = this.nomchamp;
              champ.token = localStorage.getItem("token");
              this.champService.addChamp(champ).subscribe(message => {
                this.showMsg= true;
                this.router.navigate(['/pages/creation-categorie-champ'],{replaceUrl:true});
              });
      }
  }

}
