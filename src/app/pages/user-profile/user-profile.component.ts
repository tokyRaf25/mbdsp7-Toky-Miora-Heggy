import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoggingService} from '../../clients/logging.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  public titrelava: string = null;
  public elementType: string = null;
  public value: string = null;
  constructor(private route:Router, private authenticationService: LoggingService) {
    const currentClients = this.authenticationService.currentClientsValue;
    this.titrelava = ''+JSON.stringify(currentClients);
    this.value ='kfoze';
   }

}
