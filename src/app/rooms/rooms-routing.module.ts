import {NgModule, Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRoomsComponent} from './list-rooms/list-rooms.component';
import { listPromoComponent } from './list-promo/list-promo.component';




export const routes: Routes = [
  {
    path: 'list',
    component: ListRoomsComponent
  },
  {path: 'promo',
  component:   listPromoComponent
  
  }
  ];
   


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {
}