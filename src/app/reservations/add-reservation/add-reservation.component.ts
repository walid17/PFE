import {Component, OnInit} from '@angular/core';
import {Client} from 'src/app/shared/models/client';
import {FormGroup} from '@angular/forms';
import {ClientServices} from 'src/app/shared/service/client.service';
import {Reservation} from '../../shared/models/reservation';
import {ReservationServices} from '../../shared/service/reservation.service';
import {Router} from '@angular/router';
import {Utils} from '../../shared/utils';

declare var jQuery: any;

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  reservation: Reservation;
  form: FormGroup = new FormGroup({});

  constructor(private clientServices: ClientServices,
              private reservationServices: ReservationServices,
              private router: Router) {
    this.reservation = new Reservation();
  }

  ngOnInit() {
    let baseContext = this;

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


  }

  addReservation() {
    console.log(this.reservation);
    this.reservationServices.reservationObject = this.reservation;
    this.router.navigate(['/rooms/list']);
  }
}
