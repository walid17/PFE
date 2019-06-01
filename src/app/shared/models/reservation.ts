import {Client} from './client';
import { Chambre } from './chambre';

export class Reservation {
  checkIn: string;
  checkOut: string;
  NB_ADULT: number;
  NB_ENF: number;
  NB_CHAMBRE: number;
chambre: Chambre = new Chambre();
  client: Client = new Client();
}
