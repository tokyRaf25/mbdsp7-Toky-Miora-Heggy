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
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';

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
  message:boolean = false;
  public form:FormGroup;
  public equipeA1:AbstractControl;
  public equipeB1:AbstractControl;
  public date1:AbstractControl;
  public time1:AbstractControl;
  public typeParie1:AbstractControl;
  public autres_info1:AbstractControl;
  constructor(
	private pariSportService: ParisportService,
  private categorieService: CategorieService,
  private coteService: CoteService,
  private typeService: TypeService,
  private route: ActivatedRoute,
  private router: Router,
   fb:FormBuilder
  ) { 
    this.router = router;
      this.form = fb.group({
          'equipeA1': ['', Validators.compose([Validators.required])],
          'equipeB1': ['', Validators.compose([Validators.required])],
          'date1': ['', Validators.compose([Validators.required])],
          'time1': ['', Validators.compose([Validators.required])],
          'typeParie1': ['', Validators.compose([Validators.required])], 
          'autres_info1':['', Validators.compose([Validators.required])], 
      });
      this.equipeA1 = this.form.controls['equipeA1'];
      this.equipeB1 = this.form.controls['equipeB1'];
      this.date1 = this.form.controls['date1'];
      this.time1 = this.form.controls['time1'];
      this.typeParie1 = this.form.controls['typeParie1'];
      this.autres_info1 = this.form.controls['autres_info1'];
  }

  ngOnInit() {
    this.getType();
  }

  AddMatch() {
      this.categorieform.forEach(element => {
        element.Champ.forEach(result=>{
              if(!result.valeur){
                  this.message = true;
                  this.router.navigate(['/pages/creation-foot'],{replaceUrl:true});
              }
              if(result.valeur){
                this.message = false;
              }
        });
      });
      console.log(this.message);
      if(this.message==false){
        this.equipeA = this.form.controls['equipeA1'].value;
        this.equipeB = this.form.controls['equipeB1'].value;
        this.date = this.form.controls['date1'].value;
        this.time = this.form.controls['time1'].value;
        this.typeParie = this.form.controls['typeParie1'].value;
        this.pariSport.equipes = [{nomEquipe:this.equipeA},{nomEquipe:this.equipeB}];
        this.pariSport.idTypePari = this.typeParie ;
        this.pariSport.dateDuMatch = ""+this.date+" "+this.time+""; 
        this.pariSport.autres_info = this.form.controls['autres_info1'].value;;
        this.pariSport.token = localStorage.getItem("token");
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
                  this.cote.token = localStorage.getItem("token");
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
    console.log("Test",localStorage.getItem('token'));
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

  public onSubmit(values:Object):void {
    /*if (this.form.valid) {
        var admin = new Administrateur();
        admin.login = this.form.controls['name'].value;
        admin.password = this.form.controls['password'].value;
        this.adminService.authentificate(admin).subscribe(data=>{
          console.log("Acces authorize")
          const datatoken = data.token;
          localStorage.setItem('token', datatoken);
          this.router.navigate(['/pages/creation-tennis'],{replaceUrl:true});
        });
    }*/
  }
}
