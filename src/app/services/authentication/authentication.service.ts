import { Injectable } from '@angular/core';

import { LS_TOKEN_KEY, LS_TOKEN_VALUE } from '../../constants/storage';
import { Router } from '@angular/router';
import { STATUS_PATH } from '../../constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem(LS_TOKEN_KEY);
    return token !== null;
  }

  login(): void {
    localStorage.setItem(LS_TOKEN_KEY, LS_TOKEN_VALUE);
    this.router.navigateByUrl(STATUS_PATH);
  }
}
