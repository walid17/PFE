import { Tarif } from './tarif';

export class Chambre {
  ID: number;
  ETAGE: string;
  CHAMBRE_NR: string;
  DESCRIPTION: string;
  SUITE: number;
  ETAT: number;
  VUE_MER: number;
  VUE_PISCINE: number;
  type: string;
  NB_CHAMBRE: number;
  PRIX_BASE: number;
  PRIX_ADLUT: number;
  MAX_PERSONNES: number;
  PRIX_ENF1: number;
  PRIX_ENF2: number;
  checkIn: Date;
  checkOut: Date;
  image: ImageData;
  checked: boolean;
  statePromo: boolean ;
  promoPRIX: number ;
  promo: Tarif = new Tarif(); 

  // equipements: Equipement[] = [];
}
