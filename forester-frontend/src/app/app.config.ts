import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MarkerService } from './marker.service';
import { provideHttpClient } from '@angular/common/http';
import { DatasetService } from './dataset.service';
import { KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { initializeKeycloak } from './util/app.init';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [MarkerService, DatasetService, provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    KeycloakService,
    provideRouter(routes),
    MarkerService,
    DatasetService,
    provideHttpClient(),
    provideAnimations(),
    provideNoopAnimations(),
    provideNativeDateAdapter(),
    importProvidersFrom([
      CommonModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
    ])],
};
