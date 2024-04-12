import { MapComponent } from "./map/map.component";

import { AuthGuard } from "./util/app.guard";

export const routes = [
  { path: "", component: MapComponent, canActivate: [AuthGuard] },
  { path: "register", component: MapComponent },
  { path: "home", component: MapComponent, canActivate: [AuthGuard] },
];
