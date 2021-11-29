/**
 * Title: auth.guard.ts
 * Author: Alex Haefner, Sarah Baptiste, Angie Martin
 * Date: 29 Nov 2021
 * Description: The auth guard file for bcrs
 */

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;

    const sessionUser = this.sessionStorage.get('session_user');

    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(['/session/signin']);

      return false;
    }
  }
}
