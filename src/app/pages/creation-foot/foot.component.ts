import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParisportService } from './parisport.service';
import { Parisport } from './parisport';
import { CategorieService } from './categorie.service';
import { Categorie } from './categorie.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  date:string ='';
  time:string ='';
  showMsg: boolean = false;
  constructor(
	private pariSportService: ParisportService,
  private categorieService: CategorieService,
  private route: ActivatedRoute,
  private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  AddMatch() {
	   if(this.equipeA && this.equipeB && this.date && this.time){
		  this.pariSport.equipes = [{nomEquipe:this.equipeA},{nomEquipe:this.equipeB}];
		  this.pariSport.idTypePari = 1 ;
		  this.pariSport.dateDebut = new Date(this.date);
		  this.pariSport.dateFin = new Date("2020/12/01");
		  this.pariSport.status = "En cours";
		  this.pariSport.autres_info = "";
		 
		  this.pariSportService.addAssignment(this.pariSport).subscribe(message => {
        this.showMsg= true;
			  this.router.navigate(['/pages/creation-foot'],{replaceUrl:true});
		  });
	  }
  }

  createForm(){
    this.categorieService.getCategorie("60b91a09bb33a3e0bd749715").subscribe(data=>{
          this.categorie = data;
          console.log(data);
    })
  }
}
