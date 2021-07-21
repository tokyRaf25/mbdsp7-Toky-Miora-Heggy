import { Component, OnInit } from '@angular/core';
import { ParisportService } from '../dashboard/parisport.service';
import { Parisport , ParisportModele } from '../dashboard/parisport';
import { CategorieService } from '../dashboard/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import { Clients} from '../../Clients/Clients';
import { ClientService } from '../dashboard/client.service';
import { Client } from '../dashboard/client.model';
import {LoggingService} from '../../clients/logging.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public modalRef: NgbModalRef;
  public form:FormGroup;
  constructor(private pariSportService: ParisportService, fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,public modalService: NgbModal,public serviceclient: ClientService, public service: LoggingService){
      this.form = fb.group({
        'name': ['', Validators.required],
        'email': ['', Validators.required],
        'password': ['', [Validators.required]]
    });
      this.name = this.form.controls['name'];
      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
    }

  ngOnInit() {
  }

  public onSubmit() {
    if (this.form.valid) {
      let newclient= new Client();
      newclient.jetons = 10;
      newclient.name = this.name.value;
      newclient.email = this.email.value;
      newclient.password = this.password.value;
      
      this.serviceclient.registration(newclient)
          .pipe(first())
          .subscribe(
              data => {
                this.service.login(this.name.value, this.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        console.log('control' + data);
                        this.router.navigate(['/']);
                    },
                    error => {
                        //this.toastr.error('Email ou mot de passe incorrecte', 'Erreur');
                    });
              },
              error => {
                  console.log(">>>>>>>>Manao erreur");
             });
  }
}

}
