import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/models/role.interface';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  findUserRole(username: string): Observable<Role>{
    return this.http.get(`/api/users/${username}/role`).pipe(
      map((user: User) => user.role)
    )
  }
}
