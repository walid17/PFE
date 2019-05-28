import {NgModule} from '@angular/core';
import {HomeSliderComponent} from './home-slider/home-slider.component';
import {HomeRoutingModule} from './home-routing.module';
import { SharedModule } from '../shared/shared.module';


import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeSliderComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    HttpClientModule
    
  ]
})
export class HomeModule {
}