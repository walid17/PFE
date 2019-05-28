import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutsModule} from './layouts/layouts.module';
import {HomeSliderComponent} from './home/home-slider/home-slider.component';
import {HomeModule} from './home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationServices } from './shared/service/reservation.service';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    HomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ReservationServices],
  bootstrap: [AppComponent]
})
export class AppModule {
}
