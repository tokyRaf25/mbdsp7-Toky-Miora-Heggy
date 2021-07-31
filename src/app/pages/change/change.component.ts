import { Component, OnInit } from '@angular/core';
import { ParisportService } from '../dashboard/parisport.service';
import { Parisport , ParisportModele } from '../dashboard/parisport';
import { CategorieService } from '../dashboard/categorie.service';
import { ChangeService } from './change.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import { Clients} from '../../Clients/Clients';
import {LoggingService} from '../../clients/logging.service';
import { ClientService } from '../dashboard/client.service';
import { Client } from '../dashboard/client.model';
import { ToastrService } from 'ngx-toastr';
import { MouvementJeton,MouvementJetonModel } from '../tables/mouvementjeton.model';
import { MouvementjetonService } from '../tables/mouvementjeton.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-foot',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class  ChangeComponent implements OnInit {

  id:String;
  closeResult = '';
  pariSport: Parisport[];
  public jeton: AbstractControl;
  public numerosdecompte: AbstractControl;
  public password: AbstractControl;
  public type: AbstractControl;
  public modalRef: NgbModalRef;
  public form:FormGroup;
  nombrejeton:Number;
  myDate = new Date();
  date:string;
  messageerreur:string;
  messagesuccess:string;
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getDetailPariSport(this.id);
    var currentClients = this.authenticationService.currentClientsValue;
    if(currentClients){
      this.getJetonClient();
    }else{
      this.router.navigate(['/login']);
    }
  }

  constructor(private pariSportService: ParisportService, fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,public modalService: NgbModal,public service: ChangeService,public serviceclient: ClientService,
    private authenticationService: LoggingService,public serviceMouvementJeton: MouvementjetonService,private datePipe: DatePipe){
      this.form = fb.group({
        'jeton': ['', Validators.required],
        'numerosdecompte': ['', Validators.required],
        'password': ['', [Validators.required]],
        'type':['']
    });
      this.jeton = this.form.controls['jeton'];
      this.numerosdecompte = this.form.controls['numerosdecompte'];
      this.password = this.form.controls['password'];
      this.type = this.form.controls['type'];
      this.date = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    }

  getDetailPariSport(arg:String) {
    this.pariSportService.getDetailPariSport(arg).subscribe(data=>{
      this.pariSport = data.docs;
      console.log("Ato");
      console.log(data);
    });
  }

  public open(content) {
    if(this.jeton.value){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      
    }else{
      
    }
    
  }

  public onSubmit() {
    if (this.form.valid) {
      var somme= this.jeton.value * 100;
      let newclient= new Client();
      var currentClients = this.authenticationService.currentClientsValue;
      newclient._id = currentClients.id;
      
      if(this.type.value == 'Achat'){
        newclient.jetons = this.nombrejeton + this.jeton.value;
        this.service.debitmouvementbancaire(somme,this.password.value, this.numerosdecompte.value,'DEBIT')
          .pipe(first())
          .subscribe(
              data => {
                  console.log('control' + data);
                  this.serviceclient.updateJeton(newclient)
                  .pipe(first())
                  .subscribe(
                      data => {
                        let newMouvementJeton= new MouvementJeton();
                        newMouvementJeton.idClient=currentClients.id;
                        newMouvementJeton.typeMouvement="Achat";
                        newMouvementJeton.jeton=this.jeton.value;
                        newMouvementJeton.dateMouvement=this.date;
                        this.serviceMouvementJeton.insertMouvementJeton(newMouvementJeton)
                        .pipe(first())
                        .subscribe(
                            data => {
                                console.log('Insert success');
                                this.messagesuccess="Achat de jeton réussi.";
                                this.ngOnInit();
                          },
                          error => {
                            this.messageerreur="Veullez verifier vos informations";
                            this.ngOnInit();
                        });
                      },
                      error => {
                        this.messageerreur="Veullez verifier vos informations";
                        this.ngOnInit();
                      });
              },
              error => {
                this.messageerreur="Veullez verifier vos informations";
                this.ngOnInit();
             });
      }else{
        let nbr:any = this.nombrejeton;
        newclient.jetons = nbr - this.jeton.value;
        this.service.debitmouvementbancaire(somme,this.password.value, this.numerosdecompte.value,'CREDIT')
          .pipe(first())
          .subscribe(
              data => {
                  console.log('control' + data);
                  this.serviceclient.updateJeton(newclient)
                  .pipe(first())
                  .subscribe(
                      data => {
                            let newMouvementJeton= new MouvementJeton();
                            newMouvementJeton.idClient=currentClients.id;
                            newMouvementJeton.typeMouvement="Vente";
                            newMouvementJeton.jeton=this.jeton.value;
                            newMouvementJeton.dateMouvement=this.date;
                            this.serviceMouvementJeton.insertMouvementJeton(newMouvementJeton)
                            .pipe(first())
                            .subscribe(
                                data => {
                                  this.messagesuccess="Vente de jeton réussi.";
                                  this.ngOnInit();
                              },
                              error => {
                                this.messageerreur="Veullez verifier vos informations";
                                this.ngOnInit();
                            });
                      },
                      error => {
                        this.messageerreur="Veullez verifier vos informations";
                        this.ngOnInit();
                      });
              },
              error => {
                  this.messageerreur="Veullez verifier vos informations";
                  this.ngOnInit();
             });
      }
      
  }
}

  public getJetonClient(){
    var currentClients = this.authenticationService.currentClientsValue;
    this.serviceclient.getJeton(currentClients.id).subscribe(data=>{
      this.nombrejeton = data.jetons;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
