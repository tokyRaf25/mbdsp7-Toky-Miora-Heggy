import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParisportService } from './parisport.service';
import { Parisport , ParisportModele } from './parisport';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from './categorie.service';
import { Categorie } from './categorie.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

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
  constructor(
	private pariSportService: ParisportService,
  private categorieService: CategorieService,
  private route: ActivatedRoute,
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
    console.log(localStorage.getItem("token"));
  }
	
  getPariSport() {
    console.log("this.page",this.page);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>Mandalo ato');
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

 
  
}
