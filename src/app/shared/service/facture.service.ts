import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client';
import {Config} from '../config';
import {Facture} from '../models/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureServices {

  constructor(private httpClient: HttpClient) {
  }

  add(facture: Facture) {
    return this.httpClient.post(Config.baseUrl + '/api/post/facture', facture);
  }

  convertToFacture(client: Client, price: number) {
    let facture: Facture = new Facture();

    facture.CODE = '11111';
    facture.DATE = new Date().toDateString();
    facture.NET_A_PAYER = price;
    facture.NOM_PRENOM = client.NOM_PRENOM;
    facture.SOLDE = price;
    facture.REMISE = 0;
    facture.ADRESSE=client.ADRESSE;
    facture.CIN = client.CIN;
    facture.NBREJOURS= client.NBRE_JOURS;
    facture.TEL = client.TEL;
    facture.PAYS = client.PAYS;

    return facture;
  }
}
