import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation';
import {Config} from '../config';
import {HttpClient} from '@angular/common/http';


@Injectable()


export class ReservationServices {

  reservationObject: Reservation;

  constructor(private httpClient: HttpClient) {
    this.reservationObject = new Reservation();

  }

  add(reservation: Reservation) {
    const t = Config.baseUrl.concat('/api/post/facture');
    return this.httpClient.post(Config.baseUrl + '/api/post/facture', reservation);
  }
}
