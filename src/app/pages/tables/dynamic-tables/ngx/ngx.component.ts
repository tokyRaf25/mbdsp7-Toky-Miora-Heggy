import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ChampService } from './../../../creation-foot/champ.service';
import { Champ } from './../../../creation-foot/champ.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  page: Number=1;
  limit: Number=10;
  totalDocs: Number;
  totalPages: Number;
  hasPrevPage: boolean;
  prevPage: Number;
  hasNextPage: boolean;
  nextPage: Number;
  showMsg: boolean = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

 constructor(
  private champService: ChampService,
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
      this.limit = +queryParams.limit || 2;
      this.getChamp();
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
      console.log(data);
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
        this.showMsg= true;
        this.router.navigate(['/pages/tables/dynamic-tables/ngx'],{replaceUrl:true});
      });
    } 
  }

}
