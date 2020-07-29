import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import {Session} from './user_model';

@Injectable()
export class GalletaLocalService {
  private localCookieService;
  private currentSession: Session = null;


  constructor(
    private router: Router,
    private cookieservice: CookieService) {
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.cookieservice.set('cookie-user', JSON.stringify(session));
    this.cookieservice.set('access-token', JSON.stringify(session.token ));
  }

  loadSessionData(): Session{
    const sessionStr = this.cookieservice.get('cookie-user');
    return (sessionStr) ? JSON.parse(sessionStr) as Session : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.cookieservice.deleteAll('/');
    this.currentSession = null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken(): string {
    const token = this.cookieservice.get('access-token').replace(/['"]+/g, '');
    return (token) ? token : null;
  }

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['login']);

  }
}
