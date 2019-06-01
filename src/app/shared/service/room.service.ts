import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client';
import {Config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class RoomServices {

  constructor(private httpClient: HttpClient) {
  }


  getRoomAvailable() {
    return this.httpClient.get(Config.baseUrl + '/api/get/chambre');
  }
}
