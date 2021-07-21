import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoggingService} from '../../clients/logging.service';
import { ClientService } from '../dashboard/client.service';
import { Client } from '../dashboard/client.model';
import {first} from 'rxjs/operators';

import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  public titrelava: string = null;
  public elementType: string = null;
  public value: string = null;
  id:String;
  closeResult = '';
  public emailupdate: AbstractControl;
  public nameupdate: AbstractControl;
  public password: AbstractControl;
  public modalRef: NgbModalRef;
  public form:FormGroup;
  nombrejeton:Number;
  name:String;
  email:String;
  

  ngOnInit() {
    //this.nombrejeton = currentClients.jetons;
    this.getClient();
  }
  constructor(private route:Router,private toastr: ToastrService, fb: FormBuilder,public modalService: NgbModal, private authenticationService: LoggingService,public serviceclient: ClientService) {
    const currentClients = this.authenticationService.currentClientsValue;
    this.titrelava = ''+JSON.stringify(currentClients);
    this.value ='kfoze';
    this.form = fb.group({
        'name': ['', Validators.required],
        'email': ['', Validators.required],
        'password': ['']
    });
     
   }

   public onSubmit() {
      if (this.form.valid) {
        let newclient= new Client();
        var currentClients = this.authenticationService.currentClientsValue;
        newclient._id = currentClients.id;
        newclient.name = this.form.get('name').value;
        newclient.email = this.form.get('email').value;
        newclient.password = this.form.get('password').value;
        if(newclient.password){
          this.serviceclient.updateClientPassword(newclient)
            .pipe(first())
            .subscribe(
                data => {
                  this.toastr.success('Information Update', 'Toastr fun!');
                  this.route.navigate(['/']);
                },
                error => {
                    console.log(">>>>>>>>Manao erreur");
              });
        }else{
            let newclient2= new Client();
            newclient2._id = currentClients.id;
            newclient2.name = this.form.get('name').value;
            newclient2.email = this.form.get('email').value;
            this.serviceclient.updateClient(newclient2)
            .pipe(first())
            .subscribe(
                data => {
                  console.log('>>>>>>>Update');
                  this.toastr.success('Information Update', 'Toastr fun!');
                  //this.route.navigate(['/']);
                },
                error => {
                    console.log(">>>>>>>>Manao erreur");
              });
        }
    }
  }
   public getClient(){
    var currentClients = this.authenticationService.currentClientsValue;
    this.serviceclient.getJeton(currentClients.id).subscribe(data=>{
      this.nombrejeton = data.jetons;
      this.name = data.name;
      this.email = data.email;
      this.form.get('name').setValue(this.name);
     this.form.get('email').setValue(this.email);
    });
  }

}
