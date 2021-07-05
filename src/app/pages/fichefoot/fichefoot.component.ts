import { Component, OnInit } from '@angular/core';
import { ParisportService } from '../dashboard/parisport.service';
import { Parisport , ParisportModele } from '../dashboard/parisport';
import { CategorieService } from '../dashboard/categorie.service';
import { Categorie } from '../dashboard/categorie.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-foot',
  templateUrl: './fichefoot.component.html',
  styleUrls: ['./fichefoot.component.scss']
})
export class FichefootComponent implements OnInit {

  id:String;
  pariSport: Parisport[];
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getDetailPariSport(this.id);
  }

  constructor(private pariSportService: ParisportService, private route: ActivatedRoute,
    private router: Router){}

  getDetailPariSport(arg:String) {
    console.log(">>>>>>>>>>>>>>>>>>Ato>>>>>>>>"+ arg);
    this.pariSportService.getDetailPariSport(arg).subscribe(data=>{
      this.pariSport = data.docs;
      console.log("Ato");
      console.log(data);
    });
  }

}
