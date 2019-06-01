import {Component, OnInit} from '@angular/core';
import {Client} from 'src/app/shared/models/client';
import {FormGroup} from '@angular/forms';
import {ClientServices} from 'src/app/shared/service/client.service';
import {Reservation} from '../../shared/models/reservation';
import {ReservationServices} from '../../shared/service/reservation.service';
import {Router} from '@angular/router';
import {Utils} from '../../shared/utils';
import { Facture } from './../../shared/models/facture';

declare var jQuery: any;

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  reservation: Reservation;
  form: FormGroup = new FormGroup({});
  facture= new Facture();

  constructor(private clientServices: ClientServices,
              private reservationServices: ReservationServices,
              private router: Router) {
    this.reservation = new Reservation();
  }

  ngOnInit() {
    /*let baseContext = this;

    jQuery('#checkIn').datepicker({ 
      minDate: new Date(),
      onSelect: function (el) {
        jQuery('#checkOut').datepicker('option', 'minDate', new Date(el));
        console.log(jQuery(this).val());
        baseContext.reservation.checkIn = jQuery(this).val();
      }
    });

    jQuery('#checkOut').datepicker({
      minDate: new Date(),
      onSelect: function (el) {
        baseContext.reservation.checkOut = jQuery(this).val();
      }
    });
*/

  }

  addReservation() {
    let res = localStorage.getItem('reservation')
    var monReservation: Reservation = JSON.parse(res);
    console.log(monReservation);
    this.reservation.checkIn ="2019-05-24";
    // monReservation.checkIn  ;
    
    this.reservation.checkOut ="2019-05-24";
    // monReservation.checkOut; 
    this.reservation.NB_CHAMBRE =monReservation.NB_CHAMBRE ;
    this.reservation.NB_ADULT =monReservation.NB_ADULT ;
    this.reservation.NB_ENF =monReservation.NB_ENF ;
    
    this.facture.ADRESSE = this.reservation.client.ADRESSE;
    this.facture.CIN = this.reservation.client.CIN;
    this.facture.NOM_PRENOM = this.reservation.client.NOM_PRENOM;
    this.facture.TEL = this.reservation.client.TEL;
    this.facture.PAYS = this.reservation.client.PAYS;
    this.facture.CODE = '021547';
    this.facture.reservation = this.reservation ;
    console.log(typeof(monReservation.chambre.PRIX_BASE ))
    console.log(typeof(this.reservation.client.NBRE_JOURS ))
    this.facture.TOTAL_HT =monReservation.chambre.PRIX_BASE * this.reservation.client.NBRE_JOURS ;
   
    this.facture.TVA = 19;
    this.facture.REMISE = 10;
    this.facture.SOLDE = 130;
    this.facture.NET_A_PAYER = this.facture.TOTAL_HT  +((this.facture.TOTAL_HT /100) *this.facture.TVA) - this.facture.REMISE;
    this.facture.DATE = new Date().toDateString();
    console.log(this.facture);
    Utils.generate_cutomPDF(this.facture);
    localStorage.setItem('reservation', null);
    localStorage.clear();
    this.router.navigate(['dashboard'])
   // this.reservationServices.reservationObject = this.reservation;
   // this.router.navigate(['/rooms/list']);
  }
}
