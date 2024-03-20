import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import { AuthGuard } from './util/app.guard'

export const routes = [
    { path: '', component: MapComponent},
    { path: 'register', component: MapComponent},
    { path: 'home', component: MapComponent, canActivate: [AuthGuard]}
]
