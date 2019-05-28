import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeSliderComponent} from './home-slider/home-slider.component';


export const routes: Routes = [
  {
    path: 'dashboard',
    component: HomeSliderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
