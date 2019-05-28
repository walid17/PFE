import {NgModule, Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRoomsComponent} from './list-rooms/list-rooms.component';




export const routes: Routes = [
  {
    path: 'list/:res',
    component: ListRoomsComponent
  },
  ];
   


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {
}