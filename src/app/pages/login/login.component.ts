import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ClientService } from '../dashboard/client.service';
import {Client,ClientModel } from '../dashboard/client.model';
import { Router } from '@angular/router';@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public router: Router;
  public form:FormGroup;
  public name:AbstractControl;
  public password:AbstractControl;
  constructor(router:Router, fb:FormBuilder,private clientService:ClientService) {
    this.router = router;
    this.form = fb.group({
        'name': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
    });

    this.name = this.form.controls['name'];
    this.password = this.form.controls['password'];
  }
  public onSubmit(values:Object):void {
    if (this.form.valid) {
        var client = new ClientModel();
        client.name = this.form.controls['name'].value;
        client.password = this.form.controls['password'].value;
        this.clientService.authentificate(client).subscribe(data=>{
          console.log("Acces authorize")
          client.token= data.token;
          localStorage.setItem('token', JSON.stringify(client));
          this.router.navigate(['/pages/dashboard'],{replaceUrl:true});
        });
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
