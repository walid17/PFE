import {NgModule} from '@angular/core';

import {ListRoomsComponent} from './list-rooms/list-rooms.component';
import {RoomsRoutingModule} from './rooms-routing.module';
import {SharedModule} from '../shared/shared.module';
import { listPromoComponent } from './list-promo/list-promo.component';



@NgModule({
  declarations: [ListRoomsComponent,listPromoComponent],
  imports: [
    SharedModule,
    RoomsRoutingModule
    
  ]
})
export class RoomsModule {
}