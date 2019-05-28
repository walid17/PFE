import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AddReservationComponent],
  imports: [
    SharedModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
