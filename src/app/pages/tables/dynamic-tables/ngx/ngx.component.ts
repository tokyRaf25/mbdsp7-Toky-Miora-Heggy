import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ChampService } from './../../../creation-foot/champ.service';
import { Champ } from './../../../creation-foot/champ.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'app/pages/creation-foot/categorie.model';
import { CategorieService } from './../../../creation-foot/categorie.service';
@Component({
  selector: 'app-ngx',
  templateUrl: './ngx.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NgxComponent {

  champ:Champ[];
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
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
  champUpdated:Champ;
  nomchamp:String;
  idchamp:String;
  categorieList:Categorie[];
  categorieSelected : string;
  showMsgDelete: boolean = false;
  select:String;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

 constructor(
  private champService: ChampService,
  private categorieService: CategorieService,
  private route: ActivatedRoute,
  private router: Router
 ) {
    this.fetch((data) => {
      this.temp = [...data];
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/company.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;
      this.getChamp();
      this.getCategorie();
    });
  }

  getChamp(){
    this.champService.getAllChampPagine(this.page, this.limit).subscribe(data=>{
      this.champ = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      //console.log(data);
      this.categorieService.getAllCategorieModel().subscribe(data=>{
        this.categorie = data.docs;
        //console.log(data);
        this.champ.forEach(champ=>{
            this.categorie.forEach(categorie=>{
                if(champ.idCategorie == categorie._id){
                  champ.nomCategorie = categorie.nomcategorie;
                }
            });
        });
      });
    });
  }
  premierePage() {
    this.router.navigate(['/pages/tables/dynamic-tables/ngx'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
   
    this.router.navigate(['/pages/tables/dynamic-tables/ngx'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/pages/tables/dynamic-tables/ngx'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/pages/tables/dynamic-tables/ngx'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

  deleteChamp(champ:Champ){
      if(confirm("Etes vous sur de vouloir supprimer ")) {
        this.champService.deleteChamp(champ._id).subscribe(data=>{
          this.getChamp();
          this.showMsg= false;
          this.showMsgDelete = true;
          this.router.navigate(['/pages/tables/dynamic-tables/ngx'],{replaceUrl:true});
        });
      } 
  }

  getInfo(champ:Champ){
    this.champUpdated = champ;
    this.nomchamp = this.champUpdated.nomChamp;
    this.idchamp = this.champUpdated._id;
    this.select = this.champUpdated.idCategorie;
  }

  getCategorie(){
    this.categorieService.getAllCategoriePagine(1,10).subscribe(data=>{
      this.categorieList = data.docs;
    });
  }

  get getCategorieSelect() {
    return this.categorie;
  }

  set setCategorieSelect(value) {
    this.categorie = value;
  }

  update(){
      if(this.categorieSelected && this.nomchamp && this.idchamp){
        console.log(this.categorieSelected +"et" + this.nomchamp + "et"+this.idchamp);
        var champ =  new Champ();
        champ.nomChamp = this.nomchamp;
        champ._id = this.idchamp;
        champ.idCategorie = this.categorieSelected;
        champ.token = localStorage.getItem("token");
      
        this.champService.updateChamp(champ).subscribe(data=>{
          this.getChamp();
          this.showMsg= true;
          this.showMsgDelete = false;
          this.router.navigate(['/pages/tables/dynamic-tables/ngx'],{replaceUrl:true});
        });
      }
    
  }

}
