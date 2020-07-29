import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Estudio } from './estudio.model';
import { environment } from '../../../../environments/environment';
import { GalletaLocalService } from '../../../core/services/autenticar/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {
  public token: string = this.galletaLocalService.getCurrentToken();

  constructor(
    private http: HttpClient,
    private galletaLocalService: GalletaLocalService,
   ) { }

  getEstudio(numemp) {

    const headers = { 'access-token': this.token};
    return this.http.get<Estudio>(`${environment.url_api}/estudios/${numemp}`, {headers});
  }

}
