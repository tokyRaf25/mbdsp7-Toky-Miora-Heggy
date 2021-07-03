import { Component, ViewEncapsulation } from '@angular/core';
import { CategorieService } from './../../../creation-foot/categorie.service';
import { Categorie } from './../../../creation-foot/categorie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampService } from './../../../creation-foot/champ.service';
import { Type } from './../../../creation-foot/type';
import { TypeService } from './../../../creation-foot/type.service';
import { Champ } from './../../../creation-foot/champ.model';
import { isThisHour } from 'date-fns';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SmartComponent {
  public data = [];
  type:Type[];
  categorieUpdated:Categorie;
  categorie:Categorie[];
  typeParie:string = "";
  test:string;
  page: Number=1;
  limit: Number=10;
  totalDocs: Number;
  totalPages: Number;
  hasPrevPage: boolean;
  prevPage: Number;
  hasNextPage: boolean;
  nextPage: Number;
  showMsg: boolean = false;
  showMsgDelete: boolean = false;
  modalformGroup:FormGroup;
  nomcategorie:String;
  idcategorie:String;
  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'right' // left|right
    },
    add: {     
      addButtonContent: '<h4 class="mb-1"><i class="fa fa-plus ml-3 text-success"></i></h4>',
      createButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil mr-3 text-primary"></i>',
      saveButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {     
      id: {
        title: 'ID',
        editable: false,
        width: '60px',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
      },
      firstName: {
        title: 'First Name',
        type: 'string',
        filter: true
      },
      lastName: {
        title: 'Last Name',
        type: 'string'
      },
      username: {
        title: 'Username',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      age: {
        title: 'Age',
        type: 'number'
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  constructor(
    private categorieService: CategorieService,
    private champService: ChampService,
    private typeService: TypeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder:FormBuilder
  ) { 
    this.getData((data) => {
      this.data = data;
    });
  }

  public getData(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/users.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onRowSelect(event){
   // console.log(event);
  }

  public onUserRowSelect(event){
    //console.log(event);   //this select return only one page rows
  }

  public onRowHover(event){
    //console.log(event);
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
       this.typeService.getAllTypePari().subscribe(data=>{
          this.type = data.docs;
              this.categorie.forEach(categorie=>{
                this.type.forEach(type=>{
                      if(categorie.idTypePari == type._id){
                        console.log("Test 1");
                          categorie.nomType = type.typeParie;
                      }
                });
                console.log(categorie.nomType);
           });
      });
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 2;
      this.getCategorie();
    });
    
  }
  premierePage() {
    this.router.navigate(['/pages/tables/dynamic-tables/smart'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
   
    this.router.navigate(['/pages/tables/dynamic-tables/smart'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/pages/tables/dynamic-tables/smart'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/pages/tables/dynamic-tables/smart'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

  deleteCategorie(categorie:Categorie){

    if(confirm("Etes vous sur de vouloir supprimer ")) {
      this.categorieService.deleteCategorie(categorie._id).subscribe(data=>{
        this.champService.deleteChampParCategorie(categorie._id).subscribe(data=>{
          this.getCategorie();
          this.showMsgDelete= true;  
          this.router.navigate(['/pages/tables/dynamic-tables/smart'],{replaceUrl:true});
        });
      });
    } 
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

  getInfo(categorie:Categorie){
      this.categorieUpdated = categorie;
      this.nomcategorie = this.categorieUpdated.nomcategorie;
      this.idcategorie = this.categorieUpdated._id;
     
  }

  update(){
    if(this.typeParie && this.nomcategorie && this.idcategorie){
      console.log(this.typeParie+ " et "+this.nomcategorie + " et "+this.idcategorie);
      var categorie =  new Categorie();
      categorie.idTypePari = this.typeParie;
      categorie.nomcategorie =  this.nomcategorie;
      categorie._id = this.idcategorie;
      if(localStorage.getItem("token")){
      categorie.token = localStorage.getItem("token");
      }
      this.categorieService.updateCategorie(categorie).subscribe(data=>{
        this.getCategorie();
        this.showMsgDelete = false;
        this.showMsg= true;
        this.router.navigate(['/pages/tables/dynamic-tables/smart'],{replaceUrl:true});
      });
    }
  }

 


}
