import { Component, OnInit } from '@angular/core';
import { MouvementjetonService } from './mouvementjeton.service';
import { LoggingService } from 'src/app/clients/logging.service';
import { DatePipe } from '@angular/common';
import { MouvementJeton,MouvementJetonModel } from './mouvementjeton.model';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [DatePipe]
})
export class TablesComponent implements OnInit {

  
  mouvementjeton: MouvementJeton[];
  public form:FormGroup;
  public type: AbstractControl;
  public daterecherche: AbstractControl;
  myDate = new Date();
  date:string;
  
  constructor(public serviceMouvementJeton: MouvementjetonService, fb: FormBuilder,private datePipe: DatePipe,private authenticationService: LoggingService) { 
    this.form = fb.group({
      'type': [''],
      'daterecherche': ['']
  });
    this.type = this.form.controls['type'];
    this.daterecherche = this.form.controls['daterecherche'];
    this.date = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
  }

  ngOnInit() {
    this.getJetonClient();
  }

  public onSubmit() {
    var currentClients = this.authenticationService.currentClientsValue;
    this.serviceMouvementJeton.getMouvementJeton(currentClients.id,this.daterecherche.value).subscribe(data=>{
      this.mouvementjeton=data.docs;
    });
    //window.location.reload();
    this.date= this.datePipe.transform(this.daterecherche.value, 'dd/MM/yyyy');
    this.ngOnInit();
  }

  public getJetonClient(){
    var currentClients = this.authenticationService.currentClientsValue;
    this.serviceMouvementJeton.getMouvementJeton(currentClients.id,this.date).subscribe(data=>{
      this.mouvementjeton=data.docs;
      
    });
  }

}
