import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicadoresService } from './services/dashboard/indicadores.service';
import { EmpleadosService } from './services/empleados/empleados.service';
import { AuthenticationService } from './services/autenticar/autenticar.service';
import { StorageService } from './services/autenticar/storage.service';
import { GalletaLocalService } from './services/autenticar/cookie.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    IndicadoresService,
    EmpleadosService,
    AuthenticationService,
    StorageService,
    GalletaLocalService
  ]

})
export class CoreModule { }
