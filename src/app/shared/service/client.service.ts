import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ClientServices {

  constructor(private httpClient: HttpClient) { }

add(client: Client) {
  const t = Config.baseUrl.concat('/api/post/client');
  return this.httpClient.post(Config.baseUrl + '/api/post/client', client);
}
}
