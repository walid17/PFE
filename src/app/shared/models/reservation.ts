import {Client} from './client';

export class Reservation {
  checkIn: string;
  checkOut: string;
  NB_ADULT: number;
  NB_ENF: number;
  NB_CHAMBRE: number;

  client: Client = new Client();
}
