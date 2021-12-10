import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-Cookie-service';
import { map } from 'rxjs/operators';
import {RoleService} from '';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService, private roleService: RoleService) {}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.roleService.findUserRole(this.cookieService.get('sessionuser')).pipe(map(res => {
        console.log(res);

      if (res['data'].role === 'admin') {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }))
  }
}
