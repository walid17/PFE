import { Reservation } from './reservation';

export class Facture {
  CODE: string;
  TOTAL_HT: number;
  NET_A_PAYER: number;
  REMISE: number;
  SOLDE: number;
  NOM_PRENOM: string;
  DATE: string;
  ADRESSE: string;
  TEL: string;
  CIN: string;
  NBREJOURS: number;
  PAYS: string;
  TVA: number;
  reservation:Reservation  = new Reservation();
}
