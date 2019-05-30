import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ReservationServices} from '../../shared/service/reservation.service';
import {Reservation} from '../../shared/models/reservation';
import {FormGroup} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';
declare var jQuery: any;

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {
  @ViewChild('checkOut') checkOut: ElementRef;
  @ViewChild('checkIn') checkIn: ElementRef;
  reservation: Reservation;
  
  constructor(private reservationServices: ReservationServices ,private router: Router) {
    this.reservation = new Reservation();
  }

  ngOnInit() {
    jQuery('#checkOut').datepicker({
      minDate: new Date(),
      
    });
    jQuery('#checkIn').datepicker({
      minDate: new Date(),
      onSelect: function (el) {
       jQuery('#checkOut').datepicker('option', 'minDate', new Date(el));
      }
    });

    /* this.reservationServices.getReservations()
        .subscribe( data => {
      this.reservation = data;
      console.log(data);
    },
    (error) => {
   
    }
  ); */
  }

  addReservation() {    
    console.log(this.checkIn.nativeElement.innerHTML);
  let reservation = JSON.stringify(this.reservation);
  localStorage.setItem('reservation',reservation);
    this.router.navigate(['/rooms/list'])
    
/*
    this.reservationServices.add(this.reservation)
      .subscribe(
        (data) => {
          console.log(data);
          //     this.router.navigateByUrl('/rooms/list')
        },
        (error) => {

        }
      );
      */
  }

  /*addReservation(){
    this.reservationServices.add(this.reservation).subscribe(data => {
      console.log(data);
this.router.navigateByUrl('/rooms/list');
    })
  }*/
}
