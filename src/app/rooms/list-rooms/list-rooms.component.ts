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


declare var jQuery: any;
declare var jsPDF: any;

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit {
c:Client;
  rooms: any[] = [];
  reservation: Reservation ={
    NB_ADULT: 4,
NB_CHAMBRE: 4,
NB_ENF: 5,
checkIn: "2019-05-24",
checkOut: "2019-05-24",
client: this.c
  };
  facture: Facture;

  constructor(private reservationServices: ReservationServices,
              private roomServices: RoomServices,
              private factureServices: FactureServices
              ,private router: Router,
              private activateRoute : ActivatedRoute) {
    this.facture = new Facture();
  }

  ngOnInit() {
  //   this.activateRoute.queryParams.subscribe(params => {
  //     console.log(params);
  // });
   this.activateRoute.params.subscribe(x=>{
     console.log(x);
   })
  
   
    let baseContext = this;
    // this.reservation = this.reservationServices.reservationObject;

  

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
          100,
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
        'NBR_ENF':
          1
      },
      {
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
          100,
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
        'NBR_ENF':
          1
      },
      {
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
          100,
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
        'NBR_ENF':
          1
      }, {
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
          100,
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
        'NBR_ENF':
          1
      });


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

      this.roomServices.getRoomAvailable()
        .subscribe(
          (data: Chambre[]) => {
            this.rooms = data;
          }
        );
    }
  }


  reserver() {
    console.log(this.rooms);

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
