import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TypeService } from './../creation-foot/type.service';
import { Type } from './../creation-foot/type';
import { ChampService } from './../creation-foot/champ.service';
import { Champ } from './../creation-foot/champ.model';
import { Categorie } from '../creation-foot/categorie.model';
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
  showMsg: boolean = false;
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
        if(this.typeParie && this.nomParis){
            var categorie = new Categorie();
            categorie.idTypePari = this.typeParie;
            categorie.nomcategorie = this.nomParis;
            this.categorieService.addCategorie(categorie).subscribe(message => {
              this.showMsg= true;
              this.router.navigate(['/pages/creation-tennis'],{replaceUrl:true});
            });
            
        }
  }
  AddChamp(){
    //console.log(this.categorie + " et " + this.nomchamp);
    if(this.categorie && this.nomchamp){
            var champ = new Champ();
            champ.idCategorie = this.categorie;
            champ.nomChamp = this.nomchamp;
            this.champService.addChamp(champ).subscribe(message => {
              this.showMsg= true;
              this.router.navigate(['/pages/creation-tennis'],{replaceUrl:true});
            });
    }
  }

}
