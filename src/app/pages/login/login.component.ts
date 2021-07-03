import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AdministrateurService } from './../creation-foot/administrateur.service';
import { Administrateur,AdministrateurModel } from './../creation-foot/administrateur.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public router: Router;
  public form:FormGroup;
  public name:AbstractControl;
  public password:AbstractControl;
  //public adminModel : AdministrateurModel;

  constructor(router:Router, fb:FormBuilder,private adminService:AdministrateurService) {
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
          var admin = new Administrateur();
          admin.login = this.form.controls['name'].value;
          admin.password = this.form.controls['password'].value;
          this.adminService.authentificate(admin).subscribe(data=>{
            console.log("Acces authorize")
            const datatoken = data.token;
            localStorage.setItem('token', datatoken);
            this.router.navigate(['/pages/creation-tennis'],{replaceUrl:true});
          });
      }
  }

  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }

 
}
