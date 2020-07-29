import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Horario } from './horario.model';
import { environment } from '../../../../environments/environment';
import { GalletaLocalService } from '../../../core/services/autenticar/cookie.service';

@Injectable({
  providedIn: 'root'
})

export class HorariosService {

  public token: string = this.galletaLocalService.getCurrentToken();

  constructor(
    private http: HttpClient,
    private galletaLocalService: GalletaLocalService,
   ) { }

  getHorario(numemp) {
    const headers = { 'access-token': this.token};
    return this.http.get<Horario>(`${environment.url_api}/horas/${numemp}`, {headers});
  }

}
