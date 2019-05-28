import {NgModule} from '@angular/core';

import {ListRoomsComponent} from './list-rooms/list-rooms.component';
import {RoomsRoutingModule} from './rooms-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [ListRoomsComponent],
  imports: [
    SharedModule,
    RoomsRoutingModule
  ]
})
export class RoomsModule {
}