import { Component, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { PointDeVentes } from '../creation-foot/point-de-ventes.model';
import { PointDeVentesService } from '../creation-foot/point-de-ventes.service';
import { ActivatedRoute, Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './app-calendar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppCalendarComponent {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();
  public pointdeventes: PointDeVentes[];
  page: Number=1;
  limit: Number=10;
  totalDocs: Number;
  totalPages: Number;
  hasPrevPage: boolean;
  prevPage: Number;
  hasNextPage: boolean;
  nextPage: Number;
  message:String;
  lieu:String;
  latitude:Number;
  longitude:Number;
  lieuUpdated:String;
  latitudeUpdated:Number;
  longitudeUpdated:Number;
  info:PointDeVentes;
  constructor(public pointdeventeService:PointDeVentesService, private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;
      this.getPointDeventes();
    });
  }
  public getPointDeventes(): void {
    /*this.membershipService.getUsers().subscribe( users => 
      this.users = users
    );*/ 
    this.pointdeventeService.getAllPointDeVentesPagine(this.page, this.limit).subscribe(data=>{
      this.pointdeventes = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log(data);
    });   
  }
  premierePage() {
    this.router.navigate(['/pages/point-de-ventes'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
   
    this.router.navigate(['/pages/point-de-ventes'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/pages/point-de-ventes'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/pages/point-de-ventes'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

  public deletePointDeVentes(pv:PointDeVentes){
    if(confirm("Etes vous sur de vouloir supprimer ")) {
      this.pointdeventeService.deletePointDeVentes(pv._id).subscribe(result=>{
            this.message = result.message;
            this.getPointDeventes(); 
      });
    }
  }
  insert(){
    //console.log(this.lieu+" et "+this.latitude+" et "+this.longitude);
    var pv = new PointDeVentes();
    pv.nomDuLieu = this.lieu;
    pv.latitude = this.latitude;
    pv.longitude = this.longitude;
    this.pointdeventeService.addPointDeVentes(pv).subscribe(data=>{
      this.message =  data.message;
      this.getPointDeventes();
    });

  }
  update(){
      var news =  new PointDeVentes();
      news._id = this.info._id;
      news.latitude = this.latitudeUpdated;
      news.longitude = this.longitudeUpdated;
      news.nomDuLieu = this.lieuUpdated;
      this.pointdeventeService.updatePointDeVentes(news).subscribe(data=>{
          this.message = data.message;
          this.getPointDeventes();
      });
  }

  getInfo(pv:PointDeVentes){
    this.info = pv;
    this.latitudeUpdated = pv.latitude;
    this.longitudeUpdated = pv.longitude;
    this.lieuUpdated = pv.nomDuLieu
  }
}
