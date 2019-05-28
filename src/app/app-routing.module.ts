import {NgModule} from '@angular/core';
import {FullLayoutComponent} from './layouts/full-layout.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeModule} from './home/home.module';
import {RoomsModule} from './rooms/rooms.module';
import {ReservationModule} from './reservations/reservation.module';
 


export function loadHomeModule() {
  return HomeModule;
}

export function loadRoomsModule() {
  return RoomsModule;
}
export function loadReservationsModule(){
  return ReservationModule;
}

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [],
    children: [
      {
        path: 'dashboard/',
        loadChildren: loadHomeModule
      },
      {
        path: 'rooms',
        loadChildren: loadRoomsModule
      },
      {
        path: 'reservations',
        loadChildren: loadReservationsModule
        
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

      /*{
        path: 'manage-voiture',
        loadChildren: loadManageVoitureModule
      }*/
    ],
  },
  /*{
    path: 'auth',
    loadChildren: loadManageUserModule
  },
  {
    path: 'admin/auth',
    component: AuthPageComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
