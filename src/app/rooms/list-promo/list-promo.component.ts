import {Component, OnInit} from '@angular/core';
import {ReservationServices} from '../../shared/service/reservation.service';
import {Reservation} from '../../shared/models/reservation';
import {Utils} from '../../shared/utils';
import {RoomServices} from '../../shared/service/room.service';
import {Chambre} from '../../shared/models/chambre';
import {FactureServices} from '../../shared/service/facture.service';
import {Facture} from '../../shared/models/facture';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/shared/models/client';
import { Tarif } from 'src/app/shared/models/tarif';


declare var jQuery: any;
declare var jsPDF: any;

@Component({
  selector: 'app-list-promo',
  templateUrl: './list-promo.component.html',
  styleUrls: ['./list-promo.component.css']
})
export class listPromoComponent implements OnInit {
  
c:Client;
  rooms: any = [];
  reservation= new Reservation();
//    ={
//     NB_ADULT: 4,
// NB_CHAMBRE: 4,
// NB_ENF: 5,
// checkIn: "2019-05-24",
// checkOut: "2019-05-24",
// client: this.c
//   };
  facture: Facture;

  constructor(private reservationServices: ReservationServices,
              private roomServices: RoomServices,
              private factureServices: FactureServices
              ,private router: Router,
              private activateRoute : ActivatedRoute) {
    this.facture = new Facture();
  }

  ngOnInit() {
    let res = localStorage.getItem('reservation')
    var monReservation = JSON.parse(res);
    this.reservation.checkIn ="2019-05-24";
    // monReservation.checkIn  ;
    
    this.reservation.checkOut ="2019-05-24";
    // monReservation.checkOut; 
    this.reservation.NB_CHAMBRE =monReservation.NB_CHAMBRE ;
    this.reservation.NB_ADULT =monReservation.NB_ADULT ;
    this.reservation.NB_ENF =monReservation.NB_ENF ;
    

 
   this.activateRoute.params.subscribe(x=>{
   // console.log(x);
   })
  
   
    let baseContext = this;
    // this.reservation = this.reservationServices.reservationObject;

  this.roomServices.getRoomAvailable().subscribe(
    x=> {
    console.log(x)
    this.rooms= x ;
    this.rooms.forEach(element => {
   //  element.img ='../../../assets/img/bg-img/3.jpg';
     /* let t  = new Tarif();
      t.DATE_D = new Date('2019-05-24');
      t.DATE_F = new Date('2019-05-20');
      t.PRIX = 110 ;
     element.promo = t ;
      */
    });

    }
    )
/*
    this.rooms.push({
        'ID':
          20,
        'CHAMBRE_NR':
          '2',
        'DESCRIPTION':
          'kjb',
        'SUITE':
          1,
        'ETAT':
          0,
        'NB_CHAMBRE':
          3,
        'DESCRIPTION3':
          null,
        'NOTE':
          null,
        'PRIX_BASE':
          123,
        'PRIX_ADLUT':
          40,
        'MAX_PERSONNES':
          4,
        'PRIX_ENF1':
          15,
        'checkIn':
          '2019-05-11T00:00:00',
        'checkOut':
          '2019-05-15T00:00:00',
        'image':
          null,
        'Dispo':
          true,
        'type':
          'double',
        'NBR_ADUT':
          2,
        'img': '../../../assets/img/bg-img/3.jpg' , 'NBR_ENF':
          1
      },
      {
        'ID':
          22,
        'CHAMBRE_NR':
          '2',
        'DESCRIPTION':
          'kjb',
        'SUITE':
          1,
        'ETAT':
          0,
        'NB_CHAMBRE':
          3,
        'DESCRIPTION3':
          null,
        'NOTE':
          null,
        'PRIX_BASE':
          129,
        'PRIX_ADLUT':
          40,
        'MAX_PERSONNES':
          4,
        'PRIX_ENF1':
          15,
        'checkIn':
          '2019-05-11T00:00:00',
        'checkOut':
          '2019-05-15T00:00:00',
        'image':
          null,
        'Dispo':
          true,
        'type':
          'double',
        'NBR_ADUT':
          2,
        'img': '../../../assets/img/bg-img/2.jpg' , 'NBR_ENF':
          1
      },
      {
        'ID':
          23,
        'CHAMBRE_NR':
          '2',
        'DESCRIPTION':
          'kjb',
        'SUITE':
          1,
        'ETAT':
          0,
        'NB_CHAMBRE':
          3,
        'DESCRIPTION3':
          null,
        'NOTE':
          null,
        'PRIX_BASE':
          150,
        'PRIX_ADLUT':
          40,
        'MAX_PERSONNES':
          4,
        'PRIX_ENF1':
          15,
        'checkIn':
          '2019-05-11T00:00:00',
        'checkOut':
          '2019-05-15T00:00:00',
        'image':
          null,
        'Dispo':
          true,
        'type':
          'double',
        'NBR_ADUT':
          2,
        'img': '../../../assets/img/bg-img/4.jpg' , 'NBR_ENF':
          1
      }, {
        'ID':
          21,
        'CHAMBRE_NR':
          '2',
        'DESCRIPTION':
          'kjb',
        'SUITE':
          1,
        'ETAT':
          0,
        'NB_CHAMBRE':
          3,
        'DESCRIPTION3':
          null,
        'NOTE':
          null,
        'PRIX_BASE':
          124,
        'PRIX_ADLUT':
          40,
        'MAX_PERSONNES':
          4,
        'PRIX_ENF1':
          15,
        'checkIn':
          '2019-05-11T00:00:00',
        'checkOut':
          '2019-05-15T00:00:00',
        'image':
          null,
        'Dispo':
          true,
        'type':
          'double',
        'NBR_ADUT':
          2,
        'img': '../../../assets/img/bg-img/7.jpg' , 'NBR_ENF':
          1
      });

*/
    jQuery('#checkOutDate').datepicker({
      minDate: new Date()
    });
    jQuery('#checkInDate').datepicker({
      minDate: new Date(),
      onSelect: function (el) {
        console.log(el);
        jQuery('#checkOutDate').datepicker('option', 'minDate', new Date(el));
      }
    });
    if (baseContext.reservation.checkIn && baseContext.reservation.checkOut) {
      jQuery('#checkInDate').datepicker('setDate', Utils.convertToDate(baseContext.reservation.checkIn));
      jQuery('#checkOutDate').datepicker('setDate', Utils.convertToDate(baseContext.reservation.checkOut));
     
      // this.roomServices.getRoomAvailable()
      //   .subscribe(
      //     (data: Chambre[]) => {
      //       this.rooms = data;
      //     }
      //   );
    }
  }


  reserver(id?) {
    let chamber = new Chambre();
    this.rooms.forEach(element => {
      if (element.ID === id){
chamber = element ;
      }
    });

    let res = localStorage.getItem('reservation')
    var monReservation = JSON.parse(res);

    this.reservation.checkIn ="2019-05-24";
    // monReservation.checkIn  ;
    
    this.reservation.checkOut ="2019-05-24";
    // monReservation.checkOut; 
    this.reservation.NB_CHAMBRE =monReservation.NB_CHAMBRE ;
    this.reservation.NB_ADULT =monReservation.NB_ADULT ;
    this.reservation.NB_ENF =monReservation.NB_ENF ;
    chamber.PRIX_BASE =chamber.promoPRIX ;
      this.reservation.chambre = chamber ;
    let reservation = JSON.stringify(this.reservation);
    localStorage.setItem('reservation', reservation)
    this.router.navigate(['reservations/add']);
    /*console.log(this.rooms);

    let price = this.getPriceFromRoomsSelected();
    this.facture = this.factureServices.convertToFacture(this.reservation.client, price);

    this.factureServices.add(this.facture)
      .subscribe(
        (data) => {
          // TODO Generate Facture
          Utils.generate_cutomPDF(this.facture);
        }, (error) => {

        }
      );

*/
  }

  getPriceFromRoomsSelected() {
    let sum = 0;
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].checked) {
        sum += this.rooms[i].PRIX_BASE;
      }
    }
    return sum;
  }
}
