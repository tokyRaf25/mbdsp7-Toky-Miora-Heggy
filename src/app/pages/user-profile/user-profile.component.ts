import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  public titrelava: string = null;
  public elementType: string = null;
  public value: string = null;
  constructor(private route:Router) {
    this.titrelava = 'name : Miora\n';
    this.titrelava = this.titrelava + 'password: Mioraiany\n';
    this.titrelava = this.titrelava + 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjUxZWM3YTMyOWQ4MzMyMDQ0MTBkZiIsImlhdCI6MTYyNTE3MzgzMSwiZXhwIjoxNjI1MjYwMjMxfQ.tsP1Ycgwp5FOysxrV84Lz1KHZ_ZqLe-ZHqLkhYp8e-Y';
    this.value ='kfoze';
   }

}
