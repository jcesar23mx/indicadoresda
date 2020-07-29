import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Indicador } from '../../../core/services/dashboard/indicador.model';
import { GalletaLocalService } from '../../../core/services/autenticar/cookie.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  public token: string = this.galletaLocalService.getCurrentToken();

  constructor(
    private http: HttpClient,
    private galletaLocalService: GalletaLocalService,

  ) { }

  getAllIndicadores(){
    const headers = { 'access-token': this.token };
    return this.http.get(`${environment.url_api}/calendario/`, { headers });
  }
  getAllAvance() {
    const headers = { 'access-token': this.token };
    console.log(headers);
    return this.http.get(`${environment.url_api}/avancemeses/`, { headers });
  }
}
